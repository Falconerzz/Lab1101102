import useSWR from "swr";
import Layout from "../../components/layout";
import axios from "axios";

async function fetcher(url) {
     const res = await axios.get(url);
     const cart = res.data[0];
     const data = cart.products.map(async (prod) => {
          const res = await axios.get('https://fakestoreapi.com/products/' + prod.productId); // แก้ URL เป็น products แทน carts
          const prodDetails = { ...res.data, ...prod };
          return prodDetails;
     });

     console.log(data);

     return await Promise.all(data);
}

export default function CartPage() {
     const { data, error } = useSWR('https://fakestoreapi.com/carts/user/', fetcher);

     if (error)
          return (
               <div>
                    Error: {error.message} {/* แสดง error.message แทน error object */}
               </div>
          );
     if (!data)
          return (
               <div>
                    Loading...
               </div>
          );

     return (
          <Layout>
               <table className="table"> {/* แก้ class เป็น className */}
                    <thead>
                         <tr>
                              <th scope="col">Name</th>
                              <th scope="col">Price</th>
                              <th scope="col">Qty</th>
                              <th scope="col">Sum</th>
                         </tr>
                    </thead>
                    <tbody>
                         {data.map((prod) => (
                              <tr> {/* เพิ่ม key เพื่อป้องกัน warning */}
                                   <th scope="row">{prod.title}</th>
                                   <td>{prod.price}</td>
                                   <td>{prod.quantity}</td>
                                   <td>{prod.price * prod.quantity}</td>
                              </tr>
                         ))}
                    </tbody>
               </table>
          </Layout>
     );
}