import User from "./models/User.js"
import Quote from "./models/Quote.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export default {
    Query: {
        users: async () => {
            const users = await User.find({})
            return users
        },
        user: async (parent, args, context) => await User.findOne({ email: context.email }),
        quotes: async () => await Quote.find({}).populate("by", "_id firstName lastName").sort({ createdAt: -1 }),
        quote: async (parent, args) => await Quote.find({ by: args.by })
    },
    User: {
        quotes: async (user) => await Quote.find({ by: user._id })
    },
    Quote: {
        by: async (q) => await User.findOne({ by: q._id })
    },
    Mutation: {
        // user signup
        signupUser: async (_, { userData }) => {
            const { firstName, lastName, email, password } = userData

            // checking user existence
            const isUserExist = await User.findOne({ email })
            if (isUserExist) throw new Error("User Already Exist")

            // password hash
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            // create a new user
            const user = User.create({
                firstName,
                lastName,
                email,
                password: hash
            })

            return user
        },

        // user signin
        signInUser: async (_, { userData }) => {
            const { email, password } = userData;

            // find user from database
            const user = await User.findOne({ email })
            if (!user) throw new Error("Invalid Credentials.")

            // password verify
            const isMatchPassword = bcrypt.compareSync(password, user.password)
            if (!isMatchPassword) throw new Error("Invalid Credentials.")

            const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY)

            return {
                message: 'User Login Successfully.',
                token,
                user
            }
        },

        // Create Quote
        createQuote: async (_, { name }, context) => {
            if (!context.email) {
                throw new Error("Unauthorized User.")
            }

            // find user from database
            const user = await User.findOne({ email: context.email })

            Quote.create({
                name,
                by: user._id
            })

            return "Quote Created Successfully."
        }
    }
}