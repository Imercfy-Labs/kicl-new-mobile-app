import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView, Dimensions } from 'react-native';
import { useAuth } from '../auth/AuthContext';
import { Menu, Bell } from 'lucide-react-native';
import Logo from '@/components/Logo';
import { DrawerContext } from './_layout';
import { useRouter } from 'expo-router';

export default function DashboardScreen() {
  const { user } = useAuth();
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [lastInTime, setLastInTime] = useState('--:--');
  const [lastOutTime, setLastOutTime] = useState('--:--');
  const { toggleDrawer } = React.useContext(DrawerContext);
  const router = useRouter();
  const windowHeight = Dimensions.get('window').height;
  const isWeb = Platform.OS === 'web';

  const getCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${formattedMinutes} ${ampm}`;
  };

  const handlePunch = () => {
    const currentTime = getCurrentTime();
    if (isPunchedIn) {
      setLastOutTime(currentTime);
    } else {
      setLastInTime(currentTime);
    }
    setIsPunchedIn(!isPunchedIn);
  };

  const ProgressCard = ({ title, value }) => (
    <View style={styles.progressCard}>
      <Text style={styles.progressTitle}>{title}</Text>
      <Text style={styles.progressValue}>{value}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { height: windowHeight }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleDrawer} style={styles.iconButton}>
          <Menu size={24} color="#000" />
        </TouchableOpacity>
        <Logo size="small" showText={false} />
        <TouchableOpacity style={styles.iconButton}>
          <Bell size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity 
          style={[styles.punchButton, isPunchedIn ? styles.punchOutButton : styles.punchInButton]}
          onPress={handlePunch}
        >
          <Text style={styles.punchButtonText}>
            {isPunchedIn ? 'Punch Out' : 'Punch In'}
          </Text>
        </TouchableOpacity>

        <View style={styles.timeInfo}>
          <Text style={styles.timeText}>Last In Time: {lastInTime}</Text>
          <Text style={styles.timeText}>Last Out Time: {lastOutTime}</Text>
        </View>

        <Text style={styles.sectionTitle}>My Progress:</Text>

        <View style={styles.progressGrid}>
          <ProgressCard 
            title="No. of Dealers Visited" 
            value="5"
          />
          <ProgressCard 
            title="Sales Target Progress (monthly)" 
            value="63%"
          />
          <ProgressCard 
            title="Orders Placed Today" 
            value="3"
          />
          <ProgressCard 
            title="Order Value Today" 
            value="₹ 7000"
          />
          <ProgressCard 
            title="Field Activities this Week" 
            value="2"
          />
          <ProgressCard 
            title="Hours Worked Today" 
            value="5"
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: isWeb ? 32 : 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 20,
    backgroundColor: '#E8F5E9',
    borderBottomWidth: 1,
    borderBottomColor: '#D1E7DD',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: isWeb ? 32 : 20,
    paddingBottom: isWeb ? 48 : 24,
  },
  punchButton: {
    width: isWeb ? 200 : 160,
    height: isWeb ? 200 : 160,
    borderRadius: isWeb ? 100 : 80,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: isWeb ? 32 : 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  punchInButton: {
    backgroundColor: '#8CC63F',
  },
  punchOutButton: {
    backgroundColor: '#FF3B30',
  },
  punchButtonText: {
    color: '#fff',
    fontSize: isWeb ? 28 : 24,
    fontWeight: '600',
  },
  timeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    maxWidth: isWeb ? 800 : undefined,
    alignSelf: 'center',
    width: '100%',
  },
  timeText: {
    color: '#666',
    fontSize: isWeb ? 16 : 14,
  },
  sectionTitle: {
    fontSize: isWeb ? 24 : 18,
    fontWeight: '600',
    marginBottom: isWeb ? 24 : 20,
    maxWidth: isWeb ? 800 : undefined,
    alignSelf: 'center',
    width: '100%',
  },
  progressGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: isWeb ? 24 : 16,
    maxWidth: isWeb ? 800 : undefined,
    alignSelf: 'center',
    width: '100%',
  },
  progressCard: {
    width: isWeb ? 'calc(33.33% - 16px)' : 'calc(50% - 8px)',
    backgroundColor: '#fff',
    borderRadius: isWeb ? 20 : 16,
    padding: isWeb ? 24 : 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  progressTitle: {
    fontSize: isWeb ? 16 : 14,
    color: '#666',
    marginBottom: isWeb ? 12 : 8,
  },
  progressValue: {
    fontSize: isWeb ? 28 : 24,
    fontWeight: 'bold',
    color: '#000',
  },
});