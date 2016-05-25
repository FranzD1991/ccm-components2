ccm.component({
    name: 'userstorybuilder',
    config: {
        html:  [ ccm.store, { local: './json/userstorybuilder.json' } ],
        key: 'test',
        style: [ ccm.load, './css/tutorial.css' ],
        submit: function () {
            if(testInsert('getInhalt des Formulars')==='error'||'get Inhalt des Formulars'==='error'){
                alert('Bitte alle Felder ausfüllen !');
            }else{
                us[n]=userstory(header,description,effort,priority,valuee,n);
                n++;
            }
        }
    },
    Instance: function () {
        this.render=function(callback){
            ccm.helper.element(this);
            var element = ccm.helper.element( this );
            element.html( 'Hello, World!' );
            
            var n=0;
            var us= [];

            function Userstory(hl,des,prio,eff,va){
                this.hl = hl;
                this.des = des;
                this.prio = prio;
                this.eff = eff;
                this.va =va;
            }
            
            function testInsert(ins){
                if(true){
                    return 'error'
                }else{
                    return 'success'
                }
            }

            function deleteUS(id) {
                us[id]=null;
                //Userstory mit der ID null setzen
            }
            
            function getUS(id) {
                // get Userstory by ID
                return us[id]
            }

            function showallUS() {
                for(j=1;j<us.length;j++){
                    //Userstorys drucken
                }
            }

            function changeUS(id) {

            }
            if(callback) callback();
        }
    }
});