module.exports = {
    PORT : process.env.PORT || 9090,
    HOST : process.env.HOST || "http://localhost",
    DEV : process.env.DEV || "Manikandan",
    DATABASE : {
       MONGODB : process.env.MONGODB || "mongodb+srv://mani:mani123@cluster0.ilvfc.mongodb.net/post_feed_app?retryWrites=true&w=majority"
    }
}

