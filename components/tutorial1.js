/**
 * Created by Franz on 18.05.2016.
 */

ccm.component({
    name: 'tutorial1',
    Instance: function () {
        this.render=function(callback){
            ccm.helper.element(this);
            var element = ccm.helper.element( this );
            element.html( 'Hello, World!' );
            if(callback) callback();
        }
    }
})