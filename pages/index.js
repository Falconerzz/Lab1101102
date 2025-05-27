import Layout from "../components/layout";
import Productcard from "../components/productcard";
import axios from 'axios';

export default function HomePage(props) {
    return (
        <Layout>
            <div className="row row-cols-3">
                {props.data.map((prod) => (<Productcard name={prod.title} image={prod.image} id={prod.id}/>))}
            </div>
        </Layout>
    );
}


export async function getStaticProps() {
    const res = await axios.get('https://fakestoreapi.com/products');
    const data = res.data
    return {
        props: {
            data
        }
    }
}