import { useThemeStore } from '@/stores/useThemeStore';
import { appColors } from '@/utils/colors';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {

  const { theme } = useThemeStore()


  return (
    <>


      <Tabs
        screenOptions={({ route }) => ({
          animationEnabled: true,
          //ICONS FOR TAB
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === '(home)/index') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === '(profile)/index') {
              iconName = focused ? 'person' : 'person-outline';
            } else {
              iconName = 'ellipse';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarStyle: {

            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 70,
            backgroundColor: theme === 'dark' ? appColors.dark.background : appColors.background,
            borderTopWidth: 1,
            borderTopColor: theme === 'dark' ? appColors.dark.separator : appColors.separator,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 10,



          },

          tabBarActiveTintColor: theme === 'dark' ? appColors.dark.primary.DEFAULT : appColors.primary.DEFAULT,
          tabBarInactiveTintColor: appColors.mutedForeground,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
          tabBarItemStyle: {
            borderRightWidth: 0,
          },



        })}
      >
        <Tabs.Screen
          name="(home)/index"
          options={{ title: "Home", headerShown: false }}
        />
        <Tabs.Screen
          name="(profile)/index"
          options={{
            title: "Perfil", headerShown: true, headerStyle: {
              backgroundColor: theme === 'dark' ? appColors.dark.background : appColors.background,
            },
            headerTintColor: theme === 'dark' ? appColors.dark.primary.DEFAULT : appColors.primary.DEFAULT,
          }}
        />
      </Tabs>
      </>
  );
}