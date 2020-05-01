import React, { useState, useRef } from 'react'
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

// components
import { Stopwatch } from 'react-native-stopwatch-timer'

const ScheduleWatch = () => {
  const timerRef = useRef(null)
  const [time, setTime] = useState(null)
  const [stopwatchStart, setStopwatchStart] = useState(null)
  const [stopwatchReset, setStopwatchReset] = useState(false)

  const toggleStopwatch = () => {
    setStopwatchStart(!stopwatchStart)
    setStopwatchReset(false)
  }

  const resetStopwatch = () => {
    setStopwatchStart(false)
    setStopwatchReset(true)
  }
  
  const getFormattedTime = (time) => {
    setTime(time)
  }

  return (
    <SafeAreaView
      ref={timerRef}
      style={[
        styles.pageView
      ]}
    >
      <Stopwatch
        laps
        msecs
        options={options}
        start={stopwatchStart}
        reset={stopwatchReset}
        getTime={getFormattedTime}
      />
      <View style={styles.handleButtons}>
        <TouchableHighlight
          underlayColor='#e9e9e9'
          style={styles.handleButton}
          onPress={toggleStopwatch}>
          <Text style={styles.handleButtonText}>{!stopwatchStart ? "Start" : "Stop"}</Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor='#e9e9e9'
          style={styles.handleButton}
          onPress={resetStopwatch}>
          <Text style={styles.handleButtonText}>Reset</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  )
}

const options = {
  container: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 5,
    width: 280,
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 140,
    borderWidth: 8,
    borderColor: '#e1e1e1'
  },
  text: {
    fontSize: 30,
    color: '#666',
  }
}

const styles = StyleSheet.create({
  pageView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  handleButtons: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 80,
    justifyContent: 'center'
  },
  handleButton: {
    width: 100,
    height: 100,
    marginHorizontal: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: '#e1e1e1',
    marginHorizontal: 40,
  },
  handleButtonText: {
    fontSize: 30,
    color: '#fff'
  }
})

export default ScheduleWatch
