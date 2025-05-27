import axios from 'axios';
import Layout from '../../components/layout';


export default function ProductPage({data}) {
     return (
          <Layout>
               <div class="card mb-3">
                    <div class="row g-0">
                         <div class="col-md-4">
                              <img src={data.image} class="img-fluid rounded-start" alt="..."/>
                         </div>
                         <div class="col-md-8">
                              <div class="card-body">
                                   <h5 class="card-title">{data.title}</h5>
                                   <p class="card-text">{data.description}</p>
                                   <p class="card-text"><small class="text-body-secondary">${data.price}</small></p>
                              </div>
                         </div>
                    </div>
               </div>
          </Layout>
     );
}

export async function getServerSideProps(context) {
     const res = await axios.get('https://fakestoreapi.com/products/' + context.params.id)
     const data = res.data
     return {
          props: {
               data
          }
     }
}