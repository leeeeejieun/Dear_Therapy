const ProfileStorage = require("./profileStorage");
const s3Utils = require("../utils/s3Utils");

class Profile {

    constructor(body) {
        this.body = body;
    };

    async updateProfile() {
        const {user_id, image} = this.body;
        if(!user_id) {
            return {code: 400, message: "잘못된 형태의 데이터 입니다."}; 
        }

        const profile = await ProfileStorage.findProfileImage(user_id);
    
        if(profile.profile_image) {
            await s3Utils.deleteImage(profile.profile_image);
        }
        const imageUrl = image ? await s3Utils.uploadImage("profile", image, user_id) : null;
        await ProfileStorage.updateProfileImage(user_id, imageUrl);

        return {code: 200};
    };
}

module.exports = Profile;