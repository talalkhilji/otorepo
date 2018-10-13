
import React,{Component,StyleSheet,Text,View,Image,TouchableHighlight,Animated} from 'react-native';
import Style from '../Style';
class Panel extends Component{
    constructor(props){
        super(props);

        this.icons = {
            'up'    : require('../Image/ic_up_arrow.png'),
            'down'  : require('../Image/ic_down_arrow.png')
        };

        this.state = {
            title       : props.title,
            expanded    : false,
            animation   : new Animated.Value()
        };
    }

    toggle(){
        let initialValue    = this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
            finalValue      = this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

        this.setState({
            expanded : !this.state.expanded
        });

        this.state.animation.setValue(initialValue);
        Animated.spring(
            this.state.animation,
            {
                toValue: finalValue
            }
        ).start();
    }

    _setMaxHeight(event) {
       if (!this.state.maxHeight) {
         this.setState({
           maxHeight: event.nativeEvent.layout.height,
         });
       }
     }

     _setMinHeight(event) {
       if (!this.state.minHeight) {
         this.setState({
           minHeight: event.nativeEvent.layout.height,
           animation: new Animated.Value(event.nativeEvent.layout.height),
         });
       }
     }

    render(){
        let icon = this.icons['down'];

        if(this.state.expanded){
            icon = this.icons['up'];
        }

        return (
            <Animated.View
                style={[styles.container,{height: this.state.animation}]}>
                <View style={styles.titleContainer} onLayout={this._setMinHeight.bind(this)}>
                    <Text style={Style.list_header}>{this.state.title}</Text>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={this.toggle.bind(this)}
                        underlayColor="#f1f1f1">
                        <Image
                            style={styles.buttonImage}
                            source={icon}
                        ></Image>
                    </TouchableHighlight>
                </View>

                <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>
                    {this.props.children}
                </View>

            </Animated.View>
        );
    }
}

var styles = StyleSheet.create({
    container   : {
        backgroundColor: '#fff',
        margin:10,
        borderWidth: 2,
        borderRadius: 4,
        margin:5,
        borderColor: 'rgba(0,0,0,.2)',
        overflow:'hidden'
    },
    titleContainer : {
        flexDirection: 'row'
    },
    title       : {
        flex    : 1,
        padding : 10,
        color   :'#2a2f43',
        fontWeight:'bold'
    },
    button      : {

    },
    buttonImage : {
        width   : 30,
        height  : 25
    },
    body        : {
        padding     : 10,
        paddingTop  : 0
    }
});

export default Panel;
