import Link from "next/link";

export default function Productcard(props) {
     return (
          <div className="col">
               <div class="card">
                    <img src={props.image} class="card-img-top" alt={props.title} height="300px" />
                    <div class="card-body">
                         <h5 class="card-title">{props.name}</h5>
                         <Link href="/product/[id]" as={`/product/${props.id}`} >
                              <a href="#" class="btn btn-primary">View detail</a>
                         </Link>
                    </div>
               </div>
          </div>
     );
}