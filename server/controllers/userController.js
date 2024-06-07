// import SetAvatar from '../../public/src/pages/SetAvatar.js';
import User from '../model/userModel.js';
import bcrypt from 'bcrypt';

const userController = {
  async register(req, res, next) {
    try {
      const { username, email, password } = req.body;

      // Check if username already exists
      const usernameCheck = await User.findOne({ username });
      if (usernameCheck) {
        return res.json({ msg: "Username already exists", status: false });
      }

      // Check if email already exists
      const emailCheck = await User.findOne({ email });
      if (emailCheck) {
        return res.json({ msg: "Email already exists", status: false });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const user = await User.create({
        email,
        username,
        password: hashedPassword,
      });

      // Remove password from the user object before sending response
      const userResponse = user.toObject();
      delete userResponse.password;

      return res.json({ status: true, user: userResponse });
    } catch (ex) {
      next(ex);
    }
  },

  async login(req, res, next) {
    try {
      const { username, password } = req.body;

      // Find user by username
      const user = await User.findOne({ username });
      if (!user) {
        return res.json({ msg: "Incorrect username or password", status: false });
      }

      // Compare password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (!isPasswordValid) {
        return res.json({ msg: "Incorrect username or password", status: false });
      }

      // Remove password from the user object before sending response
      const userResponse = user.toObject();
      delete userResponse.password;

      return res.json({ status: true, user: userResponse });
    } catch (ex) {
      next(ex);
    }
  },

  async setAvatar(req, res, next) {
    try {
      const userId = req.params.id;
      const avatarImage = req.body.image;
  
      // Find user by ID and update avatar image
      const userData = await User.findByIdAndUpdate(
        userId,
        {
          isAvatarImageSet: true,
          avatarImage,
        },
        { new: true } // To return the updated document
      );
  
      if (!userData) {
        return res.status(404).json({ message: "User not found" });
      }
  
      return res.json({
        isSet: userData.isAvatarImageSet,
        image: userData.avatarImage,
      });
    } catch (ex) {
      next(ex);
    }
  },


  async getAllUsers(req, res, next) {
    // everything should be in try-catch so that server donot crash due to unexpected errors

    try{
      // find all id except current
        const user=await User.find({_id:{$ne:req.params.id
        }})
        // what all to select
        .select([
          "email",
          "username",
          "avatarImage",
          "_id"
        ]);
        return res.json(user);
    }
    catch(ex){
      next(ex);
    }
    
  }
  
}

export default userController;

