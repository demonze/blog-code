<template>
  <div class="person">
      <div v-if="$frontmatter" class="single-member" 
            v-for="(person, index) in $frontmatter.linkList"
            :key="index">
        <div class="member-image">
            <img :src="person.imgUrl" :alt="person.name">
        </div>
        <div class="member-info">
            <h3>{{person.name}}</h3>
            <h5>{{person.des}}</h5>
            <!-- <p>{{person.des}}</p> -->
            <div class="social-touch">
                <a v-for="link in person.link"
                    :class="link.icon"
                    :href="link.link"
                    target="_blank"
                >
                </a>
                <!-- <a class="fb-touch" href="#">1</a>
                <a class="tweet-touch" href="#"></a>
                <a class="linkedin-touch" href="#"></a> -->
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
        }
    }
}
</script>

<style lang="stylus" scoped>
@require '../styles/wrapper.styl'
@require '../../styles/palette.styl'
.person{
    width: 100%; 
    display: flex; 
    flex-wrap:wrap; 
    justify-content: space-around;
}
/*= common css to all effects =*/
.single-member{ 
    position: relative;
    width: 280px; 
    margin: 30px 2.5%; 
    box-shadow: 0 2px 10px rgba(0,0,0,.2);
    transition: all .5s;
    background-color: #fff; 
    text-align: center;
    overflow: hidden;
    &:hover{
        box-shadow: 0 2px 30px rgba(0,0,0,.2);
        .member-info{
            // position: relative;
            top: -36px
        }
    } 
}
// .single-member:hover{
//     transform: scale(1.10)}
.member-image{
    display: inline-block; 
    overflow: hidden; 
    width: 100%; 
    height: 128px;
    transition: all 0.4s; 
    vertical-align: middle;
}
.member-image img{
    max-width: 100%; 
    // vertical-align: middle;
    width: 100%; 
    vertical-align: bottom;
}
.member-info{  
    position: relative; 
    top: 0;
    // bottom: 0;
    transition: top 0.4s; 
    border-top: 5px solid $accentColor; 
    background-color: #fff;
}
h3 {
    padding-top: 7px; 
    line-height: 33px;
    font-size: 24px; 
    font-weight: normal; 
    margin: 10px 0 0; 
    // text-transform: uppercase;
}
h5 {
    line-height: 22px;
    font-size: 16px; 
    font-weight: 300; 
    margin: 0 0 15px; 
}
p {
    padding: 0 30px; 
    margin-bottom: 10px;
    font-size: 14px; 
    font-weight: 300; 
    line-height: 22px; 
}
.social-touch{
    position: absolute;
    bottom: -51px;
    left: 0; 
    height:26px; 
    width: 100%;   
    padding: 5px 0; 
    overflow: hidden;  
    background-color: $accentColor;
    transition: all 0.4s;
}
.social-touch a{
    display: inline-block; 
    width: 27px; 
    height: 26px; 
    // vertical-align: middle; 
    margin: 0 2px; 
    /* background-image: url(../images/social-icons.png); */ 
    // background-repeat: no-repeat; 
    color: #ffffff;
    font-size: 20px;
    opacity: 0.7; 
    transition: all 0.3s;
    &:hover{
        opacity: 1
    }
}
.fb-touch{background-position: 0 0;}
.tweet-touch{background-position: -35px 0;}
.linkedin-touch{background-position: -71px 0;}
// .icon-colored .fb-touch{background-position: 0 -27px;}
// .icon-colored .tweet-touch{background-position: -35px -27px;}
// .icon-colored .linkedin-touch{background-position: -71px -27px;}
/*= common css to all effects end =*/

/*= effect-2 css =*/
// .effect-2{/* max-height: 230px; min-height: 230px; */ overflow: hidden;}
// .effect-2 h3{}
// .effect-2 .member-image{ }
// .effect-2 .member-image 
// .effect-2 
// // .effect-2:hover .member-image{height: 81px; transition: 0.4s;}
// .effect-2
/*= effect-2 css end =*/

/*= Media Query 
=============== */
@media only screen and (max-width: 980px){
	.row{width: 100%; margin: 110px 0;}
	.team-members{text-align: center;}
	.single-member{display: inline-block; vertical-align: bottom;}
}
/*= Media Query End
=================== */
</style>