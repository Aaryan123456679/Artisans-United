import { initializeApp, firestore } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore , collection, addDoc, query, where, getDocs} from 'firebase/firestore';


const firebaseConfig = initializeApp({//FirebASE CONFIG
});

const auth = getAuth();
const dataBase = getFirestore(firebaseConfig);

const addUser = async (userEmail, userRole,userName) => {
    try {
        const docRef = await addDoc(collection(dataBase, 'users'), {
        email: {userEmail},
        role: {userRole},
        name: {userName},
        });
        console.log('Document written with ID:', docRef.id);
    } catch (error) {
        console.error('Error adding document:', error);
    }
    };

    async function getUserRole(email) {
      try {
        // let colRef = collection()
          const q = query(collection(dataBase, 'users'), where("email.userEmail", "==", email));
          const querySnapshot = await getDocs(q);
  
          if (querySnapshot.size > 0) {
              const userRole = querySnapshot.docs[0].data().role.userRole;
              return userRole;
          } else {
              throw new Error(`User with email ${email} not found.`);
          }
      } catch (error) {
          console.error("Error retrieving user role:", error);
          return null;
      }
  }

  async function getUserName(email) {
    try {
      // let colRef = collection()
        const q = query(collection(dataBase, 'users'), where("email.userEmail", "==", email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.size > 0) {
            const userName = querySnapshot.docs[0].data().name.userName;
            return userName;
        } else {
            throw new Error(`User with email ${email} not found.`);
        }
    } catch (error) {
        console.error("Error retrieving user role:", error);
        return null;
    }
}
//<-------------------------------------------------------------------------------------------------------------------->
// Product adding

// Add a new item to the "Product" collection
const addProduct = async (title, price,image, email) => {
  try {
    // Add the new item to the collection first checking if the item already exists if no then adding
    const qu =  query(collection(dataBase, 'Product'), where("email", "==", email), where("price", "==", price), where("title", "==", title));
    const query_Snapshot = await getDocs(qu);
    if(query_Snapshot.size == 0){
        const docRef = await addDoc(collection(dataBase, 'Product'), {
            title: title,
            price: price,
            image: image,
            email: email, 
          });
          console.log("product Added");

      }else{alert("The Product already exists");};
    } catch (error) {
        console.error("Error adding item:", error);
    }
};

// getting products from DB
const getProduct = async (curr_num) => {
    try{
        // getting the documents anyway hence no second argument
        const myQuery = query(collection(dataBase, 'Product'),);
        const querySnap = await getDocs(myQuery);

        // Getting product if the crrent no of items is less than 8 or more (both cases done below)
        if(querySnap.size - curr_num < 8){
            let productsOnDisplay = [];
            for(let i=curr_num; i < querySnap.size;i++){
                const product = querySnap.docs[i].data();
                productsOnDisplay.push(product);
            }
            console.log(productsOnDisplay);
            return {Items:productsOnDisplay, size: curr_num + 8};
        }else{
            let productsOnDisplay = [];
            for(let i=curr_num; i < curr_num+8;i++){
                const product = querySnap.docs[i].data();
                productsOnDisplay.push(product);
            }
            console.log(productsOnDisplay);
            return {Items:productsOnDisplay, size:-1}}
    } catch(error){
        console.error("Error retrieving data: ", error);
    }
}

//<------------------------------------------------------------------------------------------------------------------------------------>

// search Item Logic

const searchItem__logic = async (searchItem) => {
    try{
        // getting the documents anyway hence no second argument
        const myQuery = query(collection(dataBase, 'Product'),where("title", ">=", searchItem));
        const querySnap = await getDocs(myQuery);

        // Getting product if the crrent no of items is less than 8 or more (both cases done below)
        if(querySnap.size===0){
            return null;
        }else{
            let productsOnDisplay = [];
            for(let i=0; i < querySnap.size;i++){
                const product = querySnap.docs[i].data();
                productsOnDisplay.push(product);
            }
            console.log(productsOnDisplay);
            return {Items:productsOnDisplay, size: querySnap.size}}
    } catch(error){
        console.error("Error retrieving data: ", error);
    }
}

export { auth , addUser, dataBase, getUserRole, addProduct, getProduct, getUserName, searchItem__logic};