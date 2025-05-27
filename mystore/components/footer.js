export default function Footer() {
     return (
          <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
               <style jsx>{`
                    span {
                         font-weight: bold
                    }
                    `}</style>
               <div class="col-md-4 d-flex align-items-center">
                    <span class="mb-3 mb-md-0 text-body-secondary" style={{backgroundColor: 'blue'}}>© 2024 Company, Inc</span>
               </div>
          </footer>
     );
}