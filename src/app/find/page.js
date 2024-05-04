'use client'

import { useSearchParams } from 'next/navigation';
import Layout from "../../../compnents/layout";
import PropertyModel from "../../../models/PropertyAd";

const PropertyCard = ({name, description, price, address, formedBy }) => (
  <div className="box">
      <div className="oneLine">
          <h2>{name}</h2>
          <p>PKR {price}</p>
      </div>
      <p className="language">{description}</p>
      <div className="oneLine">
          <p>Address: {address}</p>
          <p>Seller: {formedBy}</p>
      </div>
        <button className="buy-now">Buy Now</button>
  </div> 
);

const FindPage = () => {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const propertyCards = PropertyModel.getPropertiesByEmail(email);
  console.log('property found: ' , propertyCards);

  return (
    <Layout>

      <div class="boxes">
                {propertyCards.map((challenge, index) => (
                        <PropertyCard key={index} {...challenge} />
                    ))}
      </div>
      
    </Layout>
  );
};

export default FindPage;
