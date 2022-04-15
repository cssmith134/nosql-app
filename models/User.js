const {Schema, model} = require('mongoose');


const UserSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            required:  "You must enter an username",
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: "You must enter an email",
            trim: true
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
        
    },
    {
        toJSON: {
            virtuals: true,
        }
    }

);

UserSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;