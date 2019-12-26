import React, {Component} from 'react'
import { ScrollView, View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import funcs from '../../utils/funcs'
import LinearGradient from 'react-native-linear-gradient'

const { rem } = funcs

class Tabs extends Component {
  handlePress = (item, index) => {
    const {onChange} = this.props
    onChange && typeof onChange === 'function' && onChange(item, index)
  }

  render() {
    const { tabs, page = 0, type = 'default', style } = this.props
    if (!(tabs && tabs.length > 0)) return null
    if (type === 'scroll') {
      return <View style={[styles.scrollTab, style]}>
        <ScrollView showsHorizontalScrollIndicator={false} style={{flex: 1}} horizontal>
          {
            tabs.map((item, index) => <TouchableWithoutFeedback key={index} onPress={() => this.handlePress(item, index)}>
              <View style={[styles.scrollTabItem]}>
                <View>
                  <Text style={[styles.tabItemText, index === page && styles.tabItemTextActive]}>
                    {item.title || item.name}
                  </Text>
                  {
                    index === page && <LinearGradient
                      colors={['rgba(255, 211, 63, 1)', 'rgba(255, 250, 143, 1)']}
                      start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                      style={{height: rem(4), width: '100%'}} />
                  }
                </View>
              </View>
            </TouchableWithoutFeedback>)
          }
        </ScrollView>
      </View>
    } else {
      return <View style={[styles.tab, style]}>
        {
          tabs.map((item, index) => <TouchableWithoutFeedback key={index} onPress={() => this.handlePress(item, index)}>
            <View style={[styles.tabItem]}>
              <View>
                <Text style={[styles.tabItemText, index === page && styles.tabItemTextActive]}>
                  {item.title || item.name}
                </Text>
                {
                  index === page && <LinearGradient
                    colors={['rgba(255, 211, 63, 1)', 'rgba(255, 250, 143, 1)']}
                    start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                    style={{height: rem(4), width: '100%'}} />
                }
              </View>
            </View>
          </TouchableWithoutFeedback>)
        }
      </View>
    }
  }
}

const styles = StyleSheet.create({
  tab: {
    flexDirection: 'row',
    height: rem(44),
    paddingLeft: rem(10),
    paddingRight: rem(10),
    backgroundColor: '#fff',
    borderStyle: 'solid',
    borderColor: '#eee',
    borderBottomWidth: 1
  },
  tabItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  // scroll
  scrollTab: {
    height: rem(44),
    backgroundColor: '#fff',
    borderStyle: 'solid',
    borderColor: '#eee',
    borderBottomWidth: 1
  },
  scrollTabItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: rem(14)
  },
  // 文案
  tabItemText: {
    fontSize: rem(14),
    color: '#666'
  },
  tabItemActive: {
  },
  tabItemTextActive: {
    fontSize: rem(16),
    color: '#333'
  }
})

export default Tabs
