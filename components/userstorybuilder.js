ccm.component({
    name: 'userstorybuilder',
    Instance: function () {
        this.render=function(callback){
            ccm.helper.element(this);
            var element = ccm.helper.element( this );
            element.html( 'Hello, World!' );
            if(callback) callback();
        }
    }
});