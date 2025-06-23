// src/components/UseCaseSlider.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination, Autoplay } from 'swiper/modules';

const useCases = [
  {
    title: 'Corporate Conference Planning',
    description: 'Coordinate speakers, venues, and logistics for high-profile business events.',
    image: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Wedding Management',
    description: 'Plan and allocate decorators, catering, and venue staff for the big day.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80', // ✅ Fixed
  },
  {
    title: 'Concert Staffing',
    description: 'Assign crew, sound techs, and equipment for a flawless music night.',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80',
  },
  {
  title: 'Product Launch Events',
  description: 'Manage logistics and promotion for impactful product release events.',
  image: 'https://images.unsplash.com/photo-1581090700227-1f91d7b2c3d6?auto=format&fit=crop&w=800&q=80', // Tech launch stage
},
{
  title: 'College Fests',
  description: 'Streamline the organization of large college cultural or technical events.',
  image: 'https://images.unsplash.com/photo-1579015457136-df8e3c4a9a2e?auto=format&fit=crop&w=800&q=80', // Youth concert
},
{
  title: 'Charity Galas',
  description: 'Coordinate with volunteers, donors, and vendors to host meaningful fundraising events.',
  image: 'https://images.unsplash.com/photo-1601933470928-c6dbb729c9cc?auto=format&fit=crop&w=800&q=80', 
}

];


const UseCaseSlider = () => {
  return (
    <section className="bg-gray-100 py-16 px-4 sm:px-8 lg:px-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Popular Use Cases</h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Explore how different industries use our platform for flawless event execution.
        </p>
      </div>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000 }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {useCases.map((caseItem, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105">
              <img
                src={caseItem.image}
                alt={caseItem.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-indigo-600 mb-2">{caseItem.title}</h3>
                <p className="text-gray-600">{caseItem.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default UseCaseSlider;
