/**
 * EditorialGallery Component
 * 
 * Apple-style visual narrative gallery.
 * Not a grid - a story where scroll orchestrates the experience.
 * 
 * ✅ Variable visual rhythm
 * ✅ Never repeat same layout
 * ✅ Left/right alternation
 * ✅ Each image "breathes" at the right time
 */

import { editorialGallery } from '../../data/editorialGallery'
import EditorialBlock from './EditorialBlock'

const EditorialGallery = () => {
  return (
    <section className="editorial-gallery relative">
      {/* Subtle ambient glow */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-50"
        style={{
          background: 'radial-gradient(ellipse 100% 60% at 50% 30%, rgba(120, 119, 198, 0.02), transparent)',
        }}
      />
      
      {/* Gallery content */}
      <div className="relative z-10">
        {editorialGallery.map((item) => (
          <EditorialBlock key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}

export default EditorialGallery
