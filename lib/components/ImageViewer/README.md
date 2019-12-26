---
category: Components
type: Data Entry
title: ImageViewer
subtitle: 图片放大器
---

放大图片 且支持左右切换。

```javascript
<Modal
  visible={visible}
  onRequestClose={() => this.setState({visible: false})}
>
  <View style={{height: '100%', width: '100%'}}>
    <ImageViewer
      imageUrls={images}
      onClick={() => this.setState({visible: false})}
    />
  </View>
</Modal>
```


## API

属性 | 说明 | 类型 | 默认值
----|-----|------|------

| imageUrls   | 图片 | Array | |
| index   | 图片显示第几张 | number | 0 |
| onClick   | 点击隐藏Modal | fun | 必传 |

imageUrls数组（// https://www.npmjs.com/package/react-native-image-zoom-viewer）
```javascript
const imageUrls = [
  {
    url: 'https://avatars2.githubusercontent.com/u/7970947',
  },
  {
    url: 'https://avatars2.githubusercontent.com/u/7970947',
  },
]
```
