import ScreenSearchLayout from "@/components/screens/ScreenSearchLayout";
import CustomFlatList from "@/components/ui/CustomFlatList";

import ErrorView from "@/components/ui/ErrorView";
import Loader from "@/components/ui/Loader";
import { useAuthStore } from "@/stores/useAuthStore";
import { totalVenezuela } from "@/utils/moneyFormat";
import { useCallback, useState } from "react";
import { Text, View } from "react-native";
import OrderApprovalInfoModal from "../components/OrderAprovalInfoModal";
import OrderFilterModal from "../components/OrderFilterModal";
import OrderSearchCard from "../components/OrderSearchCard";
import ProductListModal from "../components/ProductListModal/ProductListModal";
import { useOrderApproval } from "../hooks/useOrdersApproval";
import { OrderApproval } from "../types/OrderApproval";
import { OrderFilters } from "../types/OrderFilters";
export default function OrderSearchScreen() {
  const { role } = useAuthStore();
  const [searchText, setSearchText] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  const [modalMountVisible, setModalMountVisible] = useState(false);
  const hasPermission = role === "admin" || role === "gerenteVenta";
  const [headerVisible, setHeaderVisible] = useState(true); //// Only if use extrafilter={true} on ScreenSearchLayout

  const {
    filteredOrders,
    loading,
    refreshing,
    totalOrders,
    totalUSD,
    handleRefresh,
    canRefresh,
    cooldown,
    handleChangeRevisado,
    orders, //just use locally with JSON
    handleOpenInfoModal,
    handleOpenProductsModal,
    setModalInfoVisible,
    modalInfoVisible,
    setModalProductsVisible,
    modalProductsVisible,
    selectedOrder,
    selectedProducts,
    loadingProducts,
    zones,
    sellers,
    loadFilters,
    filters,
    setFilters,
    statusList,
    activeFiltersCount,
    sortDate,
    setSortDate,
    sortMount,
    setSortMount,
    showStatus,
    setShowStatus,
    mountRange,
    setMountRange,
    mountRangeActive,
    maxMonto,
    error,
    fetchOrders,
  } = useOrderApproval(searchText);

  const handleApplyFilters = (newFilters: OrderFilters) => {
    setFilters(newFilters);
    setFilterVisible(false);
  };


  const renderOrderItem = useCallback(
    ({ item }: { item: OrderApproval }) => (
      <OrderSearchCard
        item={item}
        onPress={() => handleOpenInfoModal(item)}
        detailModal={() => handleOpenProductsModal(item)}
        hasPermission={hasPermission}
      />
    ),
    [
      handleOpenInfoModal,
      handleOpenProductsModal,
      hasPermission,
    ]
  );
  if (loading) return <Loader />;

  if (error) {
    return <ErrorView error={error} getData={fetchOrders} />;
  }

  return (
    <>
      <ScreenSearchLayout
        searchText={searchText}
        setSearchText={setSearchText}
        placeholder="Cliente o número de pedido..."
        onFilterPress={() => setFilterVisible(true)}
        filterCount={activeFiltersCount}
        extrafilter={false}
        headerVisible={false}
        // extraFiltersComponent={
        //   <FastFilters
        //     sortDate={sortDate}
        //     setSortDate={setSortDate}
        //     sortMount={sortMount}
        //     setSortMount={setSortMount}
        //     showStatus={showStatus}
        //     setShowStatus={setShowStatus}
        //     openModalMount={modalMountVisible}
        //     setModalMountVisible={setModalMountVisible}
        //     mountRangeActive={mountRangeActive}
        //   />
        //}
      >
        <CustomFlatList
          //data={orders}
          data={filteredOrders}
          renderItem={renderOrderItem}
          keyExtractor={(item, index) => `${item.fact_num}-${index}`}
          refreshing={refreshing}
          canRefresh={canRefresh}
          handleRefresh={handleRefresh}
          cooldown={cooldown}
          showtitle={true}
          title={`${totalOrders} pedidos`}
          subtitle={`con total ${totalVenezuela(totalUSD)}$`}
          ListEmptyComponent={
            <View className="p-10 items-center">
              <Text className="text-foreground dark:text-dark-foreground">
                No se encontraron pedidos...
              </Text>
            </View>
          }
        />
      </ScreenSearchLayout>

      {/* Modales */}
      {modalInfoVisible && (
        <OrderApprovalInfoModal
          visible={modalInfoVisible}
          onClose={() => setModalInfoVisible(false)}
          order={selectedOrder || undefined}
        />
      )}

      {modalProductsVisible && (
        <ProductListModal
          visible={modalProductsVisible}
          onClose={() => setModalProductsVisible(false)}
          products={selectedProducts}
          loading={loadingProducts}
          total={selectedOrder && parseFloat(selectedOrder?.tot_neto)}
        />
      )}

      {filterVisible && (
        <OrderFilterModal
          visible={filterVisible}
          onClose={() => setFilterVisible(false)}
          filters={filters}
          dataFilters={{
            zones,
            sellers,
            statusList,
          }}
          onApply={handleApplyFilters}
        />
      )}

    </>
  );
}
