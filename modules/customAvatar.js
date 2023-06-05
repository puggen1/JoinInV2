const customAvatar = (name)=>{
    const starterUrl = "https://api.dicebear.com/6.x/initials/svg?seed="
    const endURL = "&backgroundColor=00897b,039be5,1e88e5,43a047,7cb342,8e24aa,d81b60,e53935,fb8c00&backgroundType=solid&fontWeight=300"
    const fullURL = starterUrl + name + endURL
    return fullURL
}
export default customAvatar