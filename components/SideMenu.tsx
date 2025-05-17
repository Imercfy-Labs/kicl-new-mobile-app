import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { LogOut, ChevronRight } from 'lucide-react-native';

interface SideMenuProps {
  activePath: string;
  userInfo: {
    name: string;
    employeeId: string;
  };
  onClose: () => void;
}

export default function SideMenu({ activePath, userInfo, onClose }: SideMenuProps) {
  const router = useRouter();

  const MenuItem = ({ title, isActive = false, isSubItem = false, onPress }) => (
    <TouchableOpacity 
      style={[
        styles.menuItem,
        isActive && styles.activeMenuItem,
        isSubItem && styles.subMenuItem
      ]} 
      onPress={onPress}
    >
      <Text style={[
        styles.menuText,
        isActive && styles.activeMenuText,
        isSubItem && styles.subMenuText
      ]}>
        {title}
      </Text>
      {!isSubItem && <ChevronRight size={20} color={isActive ? "#fff" : "#666"} />}
      {isActive && <View style={styles.activeIndicator} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/2123375/pexels-photo-2123375.jpeg' }}
          style={styles.logo}
        />
        <Text style={styles.logoText}>TK TECH KOTHARI</Text>
        <Text style={styles.subText}>A UNIT OF KOTHARI INDUSTRIAL CORPORATION LIMITED</Text>
      </View>

      <View style={styles.userInfo}>
        <View style={styles.userAvatar}>
          <Text style={styles.userInitial}>{userInfo.name[0]}</Text>
        </View>
        <Text style={styles.userName}>{userInfo.name}</Text>
        <Text style={styles.employeeId}>Employee ID: {userInfo.employeeId}</Text>
      </View>

      <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false}>
        <MenuItem 
          title="Dashboard" 
          isActive={activePath === '/dashboard'}
          onPress={() => {
            router.push('/dashboard');
            onClose();
          }}
        />
        <MenuItem 
          title="Dealers" 
          isActive={activePath === '/dealers'}
          onPress={() => {
            router.push('/dealers');
            onClose();
          }}
        />
        {activePath === '/dealers' && (
          <>
            <MenuItem title="Dealer Info" isSubItem isActive />
            <MenuItem title="Payment" isSubItem />
            <MenuItem title="Dealer Outstanding" isSubItem />
            <MenuItem title="Dealer History" isSubItem />
            <MenuItem title="Credit Note" isSubItem />
          </>
        )}
        <MenuItem 
          title="Orders" 
          isActive={activePath.includes('/orders')}
          onPress={() => {
            router.push('/orders');
            onClose();
          }}
        />
        {activePath.includes('/orders') && (
          <>
            <MenuItem title="Place Order" isSubItem isActive />
            <MenuItem title="My Orders" isSubItem />
            <MenuItem title="Track Order" isSubItem />
          </>
        )}
        <MenuItem title="Inventory" />
        <MenuItem title="Field Development" />
        <MenuItem title="Settlement" />
      </ScrollView>

      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={() => {
          router.replace('/');
          onClose();
        }}
      >
        <LogOut size={20} color="#000" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#D1E7DD',
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  logoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E3192',
    marginBottom: 4,
  },
  subText: {
    fontSize: 8,
    color: '#2E3192',
    textAlign: 'center',
  },
  userInfo: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#D1E7DD',
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2E3192',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  userInitial: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '600',
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  employeeId: {
    fontSize: 12,
    color: '#666',
  },
  menuContainer: {
    flex: 1,
    paddingTop: 10,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activeMenuItem: {
    backgroundColor: '#3DD39E',
  },
  activeIndicator: {
    width: 4,
    height: '100%',
    backgroundColor: '#fff',
    position: 'absolute',
    right: 0,
  },
  subMenuItem: {
    paddingLeft: 40,
    backgroundColor: 'rgba(61, 211, 158, 0.1)',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  activeMenuText: {
    color: '#fff',
    fontWeight: '500',
  },
  subMenuText: {
    fontSize: 14,
    color: '#666',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#D1E7DD',
  },
  logoutText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
});