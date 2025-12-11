/**
 * EditorialBlock Component
 * 
 * Router component that renders the appropriate editorial element.
 * Maintains clean separation of concerns.
 */

import EditorialDiptych from './EditorialDiptych'
import EditorialImage from './EditorialImage'
import EditorialText from './EditorialText'

const EditorialBlock = ({ item }) => {
  switch (item.type) {
    case 'text':
      return (
        <EditorialText 
          text={item.text} 
          align={item.align}
          lightSweep={item.lightSweep}
        />
      )
    
    case 'diptych':
      return (
        <EditorialDiptych 
          images={item.images}
          speed={item.speed}
        />
      )
    
    case 'image':
    default:
      return (
        <EditorialImage 
          src={item.src}
          alt={item.alt}
          size={item.size}
          speed={item.speed}
          position={item.position}
          caption={item.caption}
        />
      )
  }
}

export default EditorialBlock
