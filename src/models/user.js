const { model, Schema } = require("mongoose")
const { isEmail } = require("validator")
const { hash, compare } = require("bcryptjs")

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes("password")) throw new Error("You think you're funny huh?")
        },
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) throw new Error("Age have to be a positive number")
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!isEmail(value)) throw new Error("Please provide a valid email address")
        },
    },
})

// Custom method to find user based on email and password
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) throw new Error("Unable to login")

    const passwordMatch = await compare(password, user.password)
    if (!passwordMatch) throw new Error("Unable to login")
    return user
}

// Hash process for user password
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await hash(this.password, 10)
    }

    next()
})

const User = model("User", userSchema)

module.exports = User
