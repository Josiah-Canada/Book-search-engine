const { AuthenticationError } = require("apollo-server-express");
const {User} = require('../models');
const {signToken} = require('../utils/auth')

const resolvers = {
    Query: {
      me: async (parent, arg, context) => {
        if(context.user){
            const foundUser = await User.findOne({_id: context.user._id}).select('-__v -password');
            return foundUser;
        }
        
      }
    },
    Mutation: {
        addUser:async (parent, {email, password, username}) => {
            return await User.create({email, password, username});
            

        },
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});

            if(!user){
                throw new AuthenticationError('Wrong Info!')
            }

            const correctPassword = user.isCorrectPasswrod(password);

            if(!correctPassword){
                throw new AuthenticationError('Wrong Info!')
            }
            
            const token = signToken(user);
            return {token, user}
        },
        saveBook: async (parent, { book }, context) => {
            if (context.user) {
                const userUpdate = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: {savedBooks: book} },
                    { new: true }
                )
                return userUpdate;
            }
            throw new AuthenticationError('You need to be logged in!')
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const userUpdate = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    { $pull: { savedBooks: { bookId: bookId } } },
                    { new: true }
                )
                return userUpdate;
            }
        }
    }
  };
  
  module.exports = resolvers;