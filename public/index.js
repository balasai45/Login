$('document').ready(function(){
    $.get('https://fakestoreapi.com/products/',function(res){
        res.map(function(items){
            let card=`<div class="card" style="width: 18rem;margin:0px 25px 25px 50px;">
           
                <img src="${items.image}" class="card-img-top" alt="" style="height:150px; ">

              
                <div class="card-body">
                  <h5 class="card-title">${items.title}</h5>
                  <p class="card-text text-truncate">${items.description}</p>
                  <p class="card-text ">${items.price}</p>
                </div>
              
          </div> `;
          $("#aftersignup").append(card);
        })
        console.log(res);
        
    })
   
})
