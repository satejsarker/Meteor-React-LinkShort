import { Meteor } from 'meteor/meteor';
import { Links } from '../imports/collections/link';
import {WebApp} from 'meteor/webapp';
import  ConnectRoute   from 'connect-route';


Meteor.startup(() => {
  // code to run on server at startup

    Meteor.publish('links', function () {
      return Links.find({});
    })
});
// exwcuted whenver a user visit with route like 
//localhost:300/anything
function onRoute(req,res,next){


    const link=Links.findOne({token:req.params.token});
 
      
   //take out the token and find the link obj and redirect
    if(link){
      Links.update(
        link,{
          $inc:{click:1}
        }
      );
      res.writeHead(307,{'Location':link.url});
      res.end();
    }
    // if we dont find it then redirect with to Root
    else{

        next();
    }

}

const middleware=ConnectRoute(function(router){
  router.get('/:token',onRoute);
})

WebApp.connectHandlers.use(middleware);