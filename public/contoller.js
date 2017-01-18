




var app=angular.module('ecomApp',['ngRoute','ngStorage']);
app.config(function($routeProvider){
	$routeProvider
		.when('/home', {
			templateUrl: 'Computers.html',
			controller : 'productController'
			
		})
		
		    .when('/search',{
					templateUrl : 'search.html',
					controller : 'productController'
				})
		
		
		
				.when('/login',{
					templateUrl : 'Login.html',
					controller : 'ecomController'
				})
				.when('/signup',{
					templateUrl : 'signup.html',
					controller : 'ecomSignUpController'
				})
				.when('/item1',{
					templateUrl : 'item.html',
					
				})
				.when('/cart',{
					templateUrl : 'CartShoppie.html'
					//controller : 'productController'
					
				})
				.when('/checkout',{
					templateUrl : 'checkoutShoppie.html',
					
				})
				 .when('/Account',{
					templateUrl : 'MyAccount.html',
					controller : 'accountController'
					
				})
					.otherwise({
			redirectTo: '/home'
		});
});

   var itemArray=[];var finalItem=[];var address=[];var userInfo=[];

window.onload = function(){
	
	//console.log(localStorage.cartDetail1);
	console.log(localStorage.logged)
if(localStorage.logged=="live"){
	document.getElementById("userName").innerHTML ="Welcome	"+ localStorage.userDetails.toUpperCase();
	document.getElementById("userName").style ="color:#52ACF2;"
document.getElementById('Logout').style.display = 'block';
document.getElementById('Login').style.display = 'none';

}
else {
	
	document.getElementById('Login').style.display = 'block';
	
	document.getElementById("Logout").style.display = 'none';
	
}
};

//logout function

function logout(){
	localStorage.setItem("logged","no");
	alert("Thank you for visiting our site..!")
	window.location="http://localhost:3000";
	
};




var passWord;var Name;
var accname;
app.controller('ecomController',function($rootScope,$location,$scope,$http,$localStorage){
console.log('i m from controller');

$http.get('/ecomController').success(function(response){
    console.log("in request ")
	var users =response;
   
	$scope.login=function(){
        var name=document.myForm["userName"].value;
        var pass=document.myForm["passWord"].value;
	var i;
	var correctCounter=0;
	var incorrectCounter=0;
	for( i=0;i<users.length;i++){
		if($scope.userName==users[i].name && $scope.passWord==users[i].pass){
			correctCounter++;
            console.log()
			//var logedin=users[i].valid;
			$scope.accname=users[i].name;
			$localStorage.logged="live";
             console.log($localStorage.logged);
			//console.log(logedin);
		}
		else{
			incorrectCounter++;
			localStorage.logged="no";
	
	
	}
      //var name=$scope.userName; 
        //var pass=$scope.passWord;
	
	}
	if(correctCounter ==1)
	{		 console.log($localStorage.logged);
			$rootScope.Name=$scope.accname;
			//$rootScope.loginshow=!logedin;
          //  $rootScope.myaccountshow=logedin;
			console.log($rootScope.Name);
			 $localStorage.userDetails=$rootScope.Name;
		localStorage.logged='live';
		localStorage.userDetails=$localStorage.userDetails;
			// localStorage.setItem("logged",true);
			// localStorage.setItem("notlogged",false);
			
			//alert($rootScope.loginshow);
			alert("Login Suucessful");
			//$location.path("/");
			
			window.location="http://localhost:8080";
	}
	else {
		//localStorage.setItem("userDetails",null  );
		 //localStorage.setItem("logged",false);
			// localStorage.setItem("notlogged",true);
        if(name.length==0||pass.length==0){
            alert('please fill the fields...');
        }else{
		alert("Invalid user...please signUp!!");
        }//window.location="http://localhost:3000";
		
	}
        
	 


	
};
     
  
	
});

	
	
	
$scope.signup=function(){
alert('welcome from signup');
};
});
var email;
var passwordPattern= "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$";
var CPassWord;

app.controller('ecomSignUpController',function($scope,$http,$rootScope,$location){
	console.log('i hghh from controller');
	//$http.get('/ecomSignUpController');
	$scope.validatePassword=function()
	{ 
		$scope.passWord=document.myForm["passWord"].value;
	
		if($scope.passWord.match(passwordPattern))
		{
			//alert("strong");
			document.getElementById("statusP").style="color:green";
			document.getElementById("statusP").innerHTML="strong!!";
	
			//enrol_Array.push(passWord);
			//enrol_obj.passWord=passWord;
		}
		else
		{
			//alert("must include one special character,one numeric,one Uppercase and one Lowercase");
			document.getElementById("statusP").innerHTML="*must include one special character,one numeric,one Uppercase and one Lowercase";
		}
	};

	$scope.validateConfirmPassword=function()
	{
		CPassWord=document.myForm["confirmPassword"].value;
 
		if(CPassWord.match($scope.passWord))
		{
			document.getElementById("statusC").innerHTML="matched";
			document.getElementById("statusC").style="color:green";
			//enrol_obj.pass=passWord;
		}
		else
		{
			document.getElementById("statusC").innerHTML="didn't match...write again!";
			document.getElementById("statusC").style="color:red";
//document.myForm1["confirm-password"].innerHTML="";
 
		}
		//$scope.CPassword=CPassword;
	}

	$scope.validateemail=function(evt){
					var emailElement=document.forms["myForm"]["email"];
				var email=emailElement.value;
				var emailpattern="^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$";
				if(email.match(emailpattern)){
					document.getElementById("statusE").innerHTML="valid";
                    document.getElementById("statusE").style="color:green";
                        }
				else{
					document.getElementById("statusE").innerHTML="invalid EmailId";
                    document.getElementById("statusE").style="color:red";
				}	

	};

	
	$scope.submit=function(){
        var emailElement=document.forms["myForm"]["email"].value;
       var CPassWord=document.myForm["confirmPassword"].value;
        var passWord=document.myForm["passWord"].value;
         var addLine1=document.myForm["addLine1"].value;
         var addLine2=document.myForm["addLine2"].value;
         var city=document.myForm["city"].value;
         var state=document.myForm["state"].value;
        var pc=document.myForm["pc"].value;
         var name=document.myForm["userName"].value;
       var country=document.myForm["country"].value;
		console.log(emailElement);
        console.log(passWord);
		console.log(CPassWord);
		
    if((name.length==0)||(passWord.length==0)||(emailElement.length==0)||(addLine1.length==0)||(addLine2.length==0)||(state.length==0)||(pc.length==0)||(country.length==0)){
        alert("enter the fields");
	}
    else{
        if(passWord==CPassWord){
            
            
            alert('user is registerd successfully !!!!');
            var users={name:name,pass:passWord,email:emailElement,addLine1:addLine1,addLine2:addLine2,city:city,state:state,country:country};
		console.log(users);
		
		$http.post('/ecomSignUpController',users);
            window.location="http://localhost:8080/#/login";
            
                    }
        else{
             alert("password did nt match");
        }
            
        }
    }
    
});
//product display n retrieval controller
var product;
app.controller('productController',function($rootScope,$location,$scope,$http){
	
   
	$scope.view=function(category){
		//var category=cat;
		console.log(category);
		
		$http.post('/product',({subcategory: category})
		).success(function(response){
			$scope.product=response;
			$scope.category=category;
		});
		
	};

	$scope.productview=function(cat){
		//var category=cat;
		console.log(cat);
		
		$http.post('/productDetails',({productName: cat})
		).success(function(response){
			$rootScope.cat=response;
			
		});
	};
	$http.post('/recitems')
		.success(function(response){
			$scope.recommended=response;
			//$scope.category=category;
		});
		
		$scope.search=function(){
			
			if($scope.searchItem){
				
			
		var item=$scope.searchItem;
		console.log("In search");
		
		
		console.log('search function'+item); 

		$http.post('/searchItem',{"itemName":item}).success(function(response){
			console.log(response.results[0]);
            if(response.results.length==0){
              
                $location.path("/search");
                     $rootScope.noProductAvailable="OOPS!! we dont have Any product with this name"
            }
            else{
			$location.path("/search");
			$rootScope.product=response.results;
       
			$scope.searchItem='';
            }
			//$scope.category='';
		});
            }
                else
                {
                  $location.path("/home");  
                }
		
		
		//var pathname='http://localhost:3000/index.html#/search';
            	//location.href=location.pathname;
	}; 
	$scope.assign=function(){
		console.log($rootScope.products);
		$scope.product=$rootScope.product;
		console.log($scope.products);
		//$scope.cat=$rootScope.cat;
		//console.log($scope.cat);
		
		
	}
		
	$scope.addToCart=function(item){
        
       

		console.log('hello from cartController');
		//var cart={item:item,user:'swati'};
		//console.log(item);
       // console.log(item.quantity);
       
        itemArray.push({productName:item.productName,price:item.price,productId:item._id,quantity:item.quantity});
        console.log("itemArrayObjects");
        console.log(itemArray);
		$rootScope.current = itemArray;
        console.log("after assignning to current");
        console.log($rootScope.current);
        
        console.log($scope.current.length);
    
		console.log($rootScope.quantityOrdered);
	};
    
        $scope.assignCurrent = function(){
        $scope.current = $rootScope.current;
        $scope.deleteDisable=false;
        $scope.remove=function(prodName){
           // alert('this item is deleted from your cart...');
            console.log(prodName);
            //var delProdName=prodName;
            $rootScope.delProdName=prodName;
            $scope.current.splice(prodName, 1);
            console.log($rootScope.delProdName);
            
        };
        var isAddressOpen=false;
        var isInvoiceOpen=false;
        var totalPrice=0;
        $scope.orderDisable=false;
        $scope.checkout=function(prodName,quant){
            console.log(localStorage.userDetails);
            
              if(localStorage.logged=='no' ){
                  alert('please login for proceeding with placing order request.............')
              }else{
            
			//$rootScope.Name=accname;
			var user=Name;
			console.log(user);
			
            if(quant==null){
                alert('please specify quantity');
            }else{
           //console.log(id+''+quant);
            var checkVar={prodName:prodName,prodQuantity:quant,user:localStorage.userDetails};
            $http.post('/checkout',checkVar).success(function(response){
                console.log(response);
                console.log(response.itemDetail.price);
                console.log(response.userDetail.addLine1+response.userDetail.addLine2+response.userDetail.city+response.userDetail.state+response.userDetail.country);
                //address.push({add1:response.userDetail.addLine1,add2:response.userDetail.addLine2,city:response.userDetail.city,state:response.userDetail.state,country:response.userDetail.country});
                
                address={
                            add1:response.userDetail.addLine1,
                            add2:response.userDetail.addLine2,
                            city:response.userDetail.city,
                            state:response.userDetail.state,
                            country:response.userDetail.country
                        };
                 $rootScope.addRess=address;
                userInfo.push({address:address,name:localStorage.userDetails,email:response.userDetail.email});
                $rootScope.userInfo=userInfo;
                finalItem.push({productName:response.itemDetail.productName,price:response.itemDetail.price,quantity:response.quantityOrdered});
                
                console.log(finalItem);
                $rootScope.finalAr=finalItem;
                console.log($rootScope.finalAr);
                //$scope.delId=$rootScope.delId;
                delProdName=$rootScope.delProdName;
                console.log(delProdName);
                /*$http.delete('/deleteOrder',{prodName:$rootScope.delProdName});*/
                
                totalPrice=totalPrice+response.itemDetail.price*response.quantityOrdered;
                $scope.totalPrice=totalPrice;
                console.log(response.itemDetail.price*response.quantityOrdered);
                  alert('this item is ordered...for further details click on invoice button');
                
                 $rootScope.delProdName=prodName;
                $scope.current.splice(prodName, 1);
            console.log($rootScope.delProdName);
            
                 
               
            });
                
                $scope.addressConfirm=function(){
                    $scope.isAddressOpen=true;
                };
                
                $scope.invoiceOpen=function(){
                    $scope.isInvoiceOpen=true;
                    $scope.orderDisable=true;
                    
                   
                };
                
            }
            
        }
            }
        
       
    
        
    }
    
       
	
});

app.controller('accountController',function($scope,$rootScope,$http){
    console.log('from account controller');
     $scope.myAccount=function(){
         var orders=[];
            console.log('from my account');
          $scope.userInfo={name:localStorage.userDetails,email:$rootScope.email,address:'asdfgh'};
       
         $http.post('/account',{name:localStorage.userDetails}).success(function(response){
             console.log(response);
             for(var i=0;i<response.length;i++){
                 orders.push(response[i].itemDetail);
             }
             console.log(orders);
             $scope.userInfo=response[0].userDetail;
             $scope.orders=orders;
         });
        };
});



