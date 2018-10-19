import React, { Component } from 'react'
import { Modal, Text, View } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'

import Styles from './Styles/OrdonnanceViewerScreenStyle'
import TestShare from "../Components/Share";

class OrdonnanceViewerScreen extends Component {

    constructor (props) {
        super(props);

        this.state = {
            index: 0,
            modalVisible: true
        };


        this._navigateTo = this._navigateTo.bind(this);
    }

    _navigateTo(pageName, params) {
        this.props.navigation.navigate(pageName, params)
    }

    render () {

        const images = [
            {
                url: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350'
            },

            {
                url: 'https://img.over-blog-kiwi.com/2/51/08/14/20171103/ob_00daa5_2011-08-03-dr-azoulay001.jpg'
            },
            {
                url: 'https://img.over-blog-kiwi.com/2/51/08/14/20171103/ob_00daa5_2011-08-03-dr-azoulay001.jpg'
            }
        ];


        return (
            <View
                style={{
                    padding: 10
                }}
            >
                <Modal
                    visible={this.state.modalVisible}
                    transparent={true}
                    onRequestClose={() => this.setState({modalVisible: false})}
                >
                    <ImageViewer
                        imageUrls={images}
                        index={this.state.index}
                        enableSwipeDown={true}
                        onClick={() => this._navigateTo('Medical')}
                        renderFooter={(index) => (<TestShare />)}
                    />
                </Modal>
            </View>

        )
    }
}

export default OrdonnanceViewerScreen