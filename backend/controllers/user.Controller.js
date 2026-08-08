// import bcrypt from "bcrypt"
// import User from '../models/auth.js'


// export const getUsers = async (req,res) => {
//     try {
//         const users = await User.find().select("-password");
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(500).json({msg: "Internal server error"})
//         console.log(error)
//     }
// }

// export const getUserById = async (req, res) => {
//     const {id} = req.params;
//     try {
//         const user = await User.findById(id).select("-password");
//         if(!user){
//             return res.status(404).json({msg: "User not found"});
//         }
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({msg: "Internal server error "});
//         console.log(error);
//     }
// }

// // Update User 
// export const updateUser = async(req,res) => {
//     const {id} = req.params;
//     const {username, email, password, avater} = req.body;

//     try {
//         const user = await User.findById(id);
//         if(!User) return res.status(404).json({msg: "User not found"});

//         // Update fields if provided 
//         if(username) user.username = username;
//         if(email) user.email = email;
//         if(password) user.password = password;
//         if(avater) user.avater = avater;

//         if(password){
//             const hashedPassword = await bcrypt.hash(password, 10);
//             user.password = hashedPassword;
//         }

//         const updatedUser = await user.save();
//         const {password : userPassword, ...userInfo} = updateUser.toObject();
//         res.status(200).json(userInfo);

//     } catch (error) {
//         res.status(500).json({ msg: "Internal server error"});
//         console.log(error)
        
//     }
// }

// // Delete user
// export const deleteUser = async (req,res) => {
//     const{id} = req.params;
//     try {
//         const user = await User.findByIdAndDelete(id);
//         if(!user) return res.status(404).json({msg: "User not found"})
//             res.status(200).json({msg: "User deleted successfully"});

//     } catch (error) {
//         res.status(500).json({msg: "Internal server error"})
//         console.log(error)
//     }
// }