import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String },
    username: { type: String, required: true, unique: true },
    location: { type: String },
    socialOnly: { type: Boolean, default: false },
    profilePicPath: { type: String },
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],

});

userSchema.pre("save", function () {
    if (this.isModified("password")) {
        this.password = bcrypt.hash(this.password, 5);
    }    
});


const User = mongoose.model("User", userSchema);
export default User;
