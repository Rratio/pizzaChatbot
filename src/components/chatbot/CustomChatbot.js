import React, {Component} from "react";
import ChatBot from 'react-native-chatbot';
import firebase from "react-native-firebase";

class  CustomChatbot extends Component {
    constructor(props) {
    super(props)
    this.state = {
      name:'',
      number:'',
      type:'',
      size:'',
      quantity:'',
      tomato: "No",
      mushroom: "No",
      veggie: "No",
      corn: "No",
      orderId:'',
      message: '',
      fetch_id:'',
      greet_msg:''
     };
  }
    
  pizzaType = type => {
      this.setState({ type: type});
    }

  quantity = value => {
    this.setState({quantity: value});
  } 

  size = number => {
    this.setState({ size: number});
  }

    eventHandler = ingredient => {
      if (ingredient === "tomato") {
        this.setState({
          tomato: "Yes"
        });
      } else if (ingredient === "mushroom") {
        this.setState({
          mushroom: "Yes"
        });
      } else if (ingredient === "corn") {
        this.setState({
          corn: "Yes"
        });
      } else if(ingredient === 'veggie') {
        this.setState({
          veggie: "Yes"
        }); 
      }
    };

    

  writeUserData(type,quantity,size,tomato,mushroom,veggie,corn){
    const orderID= Math.floor(10000000 + Math.random() * 90000000);
    this.setState({ orderId:orderID });
      // let pizzaId = this.state.orderId;
      let name = this.state.name;
      let number = this.state.number;
      this.setState({type:type,quantity:quantity,tomato:tomato,mushroom:mushroom,veggie:veggie,corn:corn})
      firebase
      .database() 
      .ref(`/users/${orderID}`)
      .set({ name, number,orderID,type,quantity,size,tomato, mushroom, veggie, corn })
      .then((data) => {
      });
    }

  showDetails(orderId,type,quantity,size,tomato,mushroom,veggie,corn) {
    var message = 'You have ordered '+quantity + ' '+size + ' '+type + ' with '
    if(tomato=='Yes') {
      message += 'extra tomato'
    }
    if(mushroom=='Yes') {
      message += ' extra mushroom'
    }
    if(veggie=='Yes') {
      message += ' extra veggie'
    }
    if(corn=='Yes') {
      message += ' extra corn'
    }
    message+='\nYour order ID is '+orderId;
    this.setState({message:message});
  }

  greetMsg(value){
    console.log(value)
    var msg = 'Hi '
    var name = value.steps.name['value'];
    msg += name+', what would you like to have ?';
    this.setState({greet_msg:msg})
  }

  readUserData(orderId) {
    let order_id = parseInt(orderId['value'])
    console.log("orderid", order_id);
    firebase.database().ref(`/users/${order_id}`).on('value', async snapshot => {
        let data = snapshot.val();
        if(data) {
        let message = ''
         if(data.name){
           message= data.name +","
         }
        message =  'Your order of '+data.quantity + ' '+data.size + ' '+ data.type+ ' with '
        if(data.tomato === 'Yes'){
          message += ' extra tomato'
        }
        if(data.mushroom === 'Yes'){
          message += ' extra mushroom'
        }
        if(data.veggie === 'Yes'){
          message += ' extra veggie'
        }
        if(data.corn === 'Yes'){
          message += 'extra corn'
        }
        message += ' is on the way.'
        this.setState({message:message})
      }
      else{
        let message = 'Looks like you have used wrong order ID. Please check it again.'
        await this.setState({message:message});
      }
    });
  }

 render() {
    const config = {
        width: "300px",
        height: "400px",
        floating: true
      };
      const steps = [
        {
           id: "Greet",
           message: "Hello, Welcome to the World of Pizza",
           trigger: "ask"
        },
        {
          id: "ask",
          options: [
                      {
                        value: "order",
                        label: "Place Order",
                        trigger: "Ask Name"
                      },
                      { 
                        value: "status",
                        label: "Check order status",
                        trigger: "Enter your order Id"
                      } 
                    ]
        },
        {
           id: "Ask Name",
           message: "Please tell me your name?",
           trigger: "name"
        },
        {
           id: "name",
           user: true,
           trigger: (value)=>{ 
            this.setState({name:value['value']})
            return "Ask contact number"
          }
        },
        {
          id: "Ask contact number",
          message: "Please tell me your contact number ?",
          trigger: "Waiting for number"
        },
        {
          id:"Waiting for number",
          user:true,
          trigger: (value)=>{ 
            this.setState({number:value['value']})
            return "Asking options to eat"
          }
        },
        {
           id: "Asking options to eat",
           message:(previousValue)=>{ this.greetMsg(previousValue);
            return this.state.greet_msg },
           trigger: "Displaying options to eat"
        },
        {
           id: "Displaying options to eat",
           options: [
                      {
                        value: "Italian Pizza",
                        label: "Italian Pizza",
                        trigger: () => {
                          this.pizzaType("Italian Pizza");
                          return "How many Pizza do you want ?";
                        }
                      },
                      {
                        value: "Cheese Brust Pizza",
                        label: "Cheese Brust Pizza",
                        trigger: () => {
                          this.pizzaType("Cheese Brust Pizza");
                          return "How many Pizza do you want ?";
                        }
                      },
                      { 
                        value: "Veg Cheese Pizza",
                        label: "Veg Cheese Pizza",
                        trigger: () => {
                          this.pizzaType("Veg Cheese Pizza");
                          return "How many Pizza do you want ?";
                        }
                      },
                      { 
                        value: "Margheita Pizza",
                        label: "Margheita Pizza",
                        trigger: () => {
                          this.pizzaType("Margheita Pizza");
                          return "How many Pizza do you want ?";
                        }
                      } 
                    ]
        }, 
        {
          id: "How many Pizza do you want ?",
          message:"How many Pizza do you want ?",
          trigger: "Display quantity of Pizza"
       },
        {
           id: "Display quantity of Pizza",
           options: [
             {
               value: "One",
               label: "One",
               trigger: () => {
                 this.quantity("One");
                 return "Which size of Pizza you wanna eat"
                }
            },
            {
              value: "Two",
              label: "Two",
              trigger: () => {
                this.quantity("Two");
                return "Which size of Pizza you wanna eat"
               }
           },
           {
            value: "Three",
            label: "Three",
            trigger: () => {
              this.quantity("Three");
              return "Which size of Pizza you wanna eat"
             }
         },
         {
          value: "Four",
          label: "Four",
          trigger: () => {
            this.quantity("Four");
            return "Which size of Pizza you wanna eat"
           }
       },
       {
        value: "Five",
        label: "Five",
        trigger: () => {
          this.quantity("Five");
          return "Which size of Pizza you wanna eat"
         }
     },
   ],
      },
      {
        id: "Which size of Pizza you wanna eat",
        message:"Which size of Pizza you Prefer",
        trigger: "Display Size of Pizza"
     },
        {
           id: "Display Size of Pizza",
           options: [
                      {
                        value: "Small",
                        label: "Small",
                        trigger: () => {
                          this.size("Small");
                          return "Asking for Tomatoes in Pizza"
                        }
                      },
                      { 
                        value: "Medium",
                        label: "Medium",
                        trigger: () => {
                          this.size("Medium");
                          return "Asking for Tomatoes in Pizza"
                        }
                      },
                      { 
                        value: "Large",
                        label: "Large",
                        trigger: () => {
                          this.size("Large");
                          return "Asking for Tomatoes in Pizza"
                        }
                      } 
                    ]
        },
        {
           id: "Asking for Tomatoes in Pizza",
           message: "Would you like to have tomatoes in your pizza",
           trigger: "Adding Tomatoes in Pizza"
        },
        {
           id: "Adding Tomatoes in Pizza",
           options: [
                      {
                        value: true,
                        label: "Yes",
                        trigger: () => {
                           this.eventHandler("tomato");
                           return "Asking for Mushroom in Pizza"  
                         }
                      },
                      { 
                        value: "false",
                        label: "No",
                        trigger: "Asking for Mushroom in Pizza"
                      } 
                    ]
        },
        {
           id: "Asking for Mushroom in Pizza",
           message: "Would you like to have mushroom in your pizza",
           trigger: "Adding Mushroom in Pizza"
        },
        {
           id: "Adding Mushroom in Pizza",
           options: [
                      {
                        value: true,
                        label: "Yes",
                        trigger: () => {
                           this.eventHandler("mushroom");
                           return "Asking for Corn in Pizza"  
                         }
                      },
                      { 
                        value: "false",
                        label: "No",
                        trigger: "Asking for Corn in Pizza"
                      } 
                    ]
        },
        {
           id: "Asking for Corn in Pizza",
           message: "Would you like to have corn in your pizza",
           trigger: "Adding Corn in Pizza"
        },
        {
           id: "Adding Corn in Pizza",
           options: [
                      {
                        value: true,
                        label: "Yes",
                        trigger: () => {
                           this.eventHandler("corn");
                           return "Asking for Veggies in Pizza"  
                         }
                      },
                      { 
                        value: "false",
                        label: "No",
                        trigger: "Asking for Veggies in Pizza"
                      } 
                    ]
        },
        {
           id: "Asking for Veggies in Pizza",
           message: "Would you like to have veggies in your pizza",
           trigger: "Adding Veggies in Pizza"
        },
        {
           id: "Adding Veggies in Pizza",
           options: [
                      {
                        value: true,
                        label: "Yes",
                        trigger: () => {
                           this.eventHandler("veggie");
                           this.writeUserData(this.state.type, this.state.quantity, this.state.size,this.state.tomato,this.state.mushroom,this.state.veggie,this.state.corn);
                           return "Here is your details"  
                         }
                      },
                      { 
                        value: "false",
                        label: "No",
                        trigger: ()=> {this.writeUserData(this.state.type, this.state.quantity, this.state.size,this.state.tomato,this.state.mushroom,this.state.veggie,this.state.corn)
                         return "Here is your details"
                        }
                      } 
                    ]
        },
        {
          id: "Here is your details",
          message:()=>{
            this.showDetails(this.state.orderId,this.state.type, this.state.quantity, this.state.size,this.state.tomato,this.state.mushroom,this.state.veggie,this.state.corn)
            return this.state.message
          },
          trigger: "Done"
       },
        {
          id: "Check the status of current order",
          message: "Do you want to check the status of current Order",
          trigger: "Displaying track Options"
       },
       {
          id: "Displaying track Options",
          options: [
                     {
                       value: true,
                       label: "Yes",
                       trigger: () => {
                       return "Enter your order Id"  
                        }
                     },
                     { 
                       value: "false",
                       label: "No",
                       trigger: "Done"
                     } 
                   ]
       },
       {
        id: "Enter your order Id",
        message: "Please enter Your Order ID",
        trigger: "Ask for id"
      },
        {
           id: "Ask for id",
           user: true,
           trigger: (value)=>{
            this.readUserData(value)
            return "Get the order details"
          }
        },
    {
      id: "Get the order details",
      message: "We are fetching details for order ID {previousValue}",
      trigger: "Status" 
    },
    {
      id: "Status",
      message: () => { return this.state.message},
      trigger: "Done"
    },
    {
      id: "Done",
      message: "Have a great day !!",
      end: true
    }
];
    return(
      <ChatBot steps={steps} botBubbleColor="#6DE3ED"  avartarStyle={{width:50}} contentStyle={{backgroundColor:'#ddd'}} submitButtonStyle={{backgroundColor:'#F4975E'}} optionElementStyle={{backgroundColor:"#F4975E", borderRadius:0}} optionStyle={{width:300, height:50, backgroundColor:'#F4975E', flexDirection:'row'}} {...config} />
     );
}
}

// const mapStateToProp = state => {
//  return {
//    userdetail: state.userdetail
//  }
// };

// const mapDispatchToProps = (dispatch) => ({
//   userDetails: (tomato, mushroom, veggie, corn) => dispatch(userDetails(tomato, mushroom, veggie, corn))
// })

export default CustomChatbot;