import { useHistory, Link } from 'react-router-dom'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { IHotel } from '../../data/interface'
import StarRating from '../StarRating'
import HotelFeatures from '../Hotel/Features'
import OverallRating from '../OverallRating'
import HotelPricing from '../Hotel/Pricing'

interface IHotelCard {
  h: IHotel
  owner?: boolean
  showViewMoreButton?: boolean
  handleDeleteHotel: (hotelId: string) => void
}

const HotelCard = ({ h, handleDeleteHotel }: IHotelCard) => {
  const history = useHistory()
  return (
    <>
      <div className="p-2 flex flex-row rounded-md border-1 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:border-blue-500">
        <div className="flex-[30%] flex flex-col">
          {h.images[0] ? (
            <img
              src={h.images[0]}
              alt="default hotel image"
              className="h-[200px] w-full object-cover rounded-md"
            />
          ) : (
            <></>
          )}
          <div className="flex gap-[6px] mt-2">
            {/* if images are more than 4 then just show 4 and 4th image to be image with +  */}
            {h.images?.slice(0, 4).map((img, index) => (
              <img
                key={index}
                src={h.images[index + 1]}
                alt="default hotel image"
                className="h-[50px] w-[50px] object-cover rounded-md"
              />
            ))}
            {h?.images?.length > 4 && (
              <img
                src="https://via.placeholder.com/900x500.png?text=MERN+Booking"
                alt="default hotel image"
                className="h-[50px] w-[50px] object-cover rounded-md"
              />
            )}
          </div>
        </div>
        <div className="px-4 py-2 flex-[50%] flex flex-col gap-y-1">
          <div className="w-full flex gap-4 items-center mb-2">
            <p className=" text-2xl font-semibold mb-0 align-middle flex items-center justify-center">
              {' '}
              {h.title}{' '}
            </p>
            {h?.rating ? <StarRating rating={h.rating} /> : <></>}
          </div>
          <div>
            <span className="text-blue-500 font-bold">{h.area}</span> | {4} km
            from {h.landmark}
          </div>
          <div className="italic">{h.city}</div>
          <HotelFeatures features={h.features} />
          <div className="d-flex justify-content-between h4">
            <button
              onClick={() => history.push(`/hotel/${h._id}`)}
              className="px-2 py-1 border-1 border-blue-500 text-xs font-semibold text-[#666] mt-2"
            >
              Show more
            </button>
            {/* //TODO: Implement this */}
            {h.postedBy === 'userId' && (
              <>
                <Link to={`/hotel/edit/${h._id}`}>
                  <EditOutlined className="text-warning" />
                </Link>
                <DeleteOutlined
                  onClick={() => handleDeleteHotel(h._id)}
                  className="text-danger"
                />
              </>
            )}
          </div>
        </div>
        <div className="col flex-[20%] border-l-2 p-2 px-2">
          {h.rating && h.reviews ? (
            <OverallRating rating={h.rating} totalReviews={h.reviews?.length} />
          ) : (
            <></>
          )}
          <HotelPricing
            pricePerNight={h.pricePerNight}
            discountedPricePerNight={h.discountedPrice}
          />
        </div>
      </div>
    </>
  )
}

export default HotelCard
