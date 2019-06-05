import React, {Component} from 'react';
import waterImg from '../../../images/mapImages/water.jpg'
import islandImg from '../../../images/mapImages/island.png'
import stoneImg from '../../../images/mapImages/stoneIsland.png'
import woodImg from '../../../images/mapImages/woodIsland.png'
import metalImg from '../../../images/mapImages/metalIsland.png'
import goldImg from '../../../images/mapImages/goldIsland.png'
import foodImg from '../../../images/mapImages/foodIsland.png'
import Konva from 'konva';
import useImage from 'use-image'
import {Stage, Layer, Image, Text, Group, Rect} from 'react-konva';
import MapSideMenu from '../MapRelated/MapSideMenu'
import Redirect from "react-router/es/Redirect";
import connect from "react-redux/es/connect/connect";
import * as actionFunctions from "../../../REDUXactions/gameRelated/gameMapActions";


class GameMap extends Component {
    constructor() {
        super()

        //used for canvas stuff only!!!!
        this.state = {
            drag: {x: 0, y: 0},
            //stores click data
            selected: '',
            //size of a square island/water
            pixelSize: 100,
            refreshRate: 1000,
            canvDimensions: {width: 500, height: 500},
            mouseOver: '0;0',
            mousePos: {x: -10000, y: -10000},
            timeout: undefined,
            dataLayerIsFrozen: false
        }
    }

    componentWillMount() {
        this.props.getConditions()
    }

    capitaliseFirstLetter(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }

    isWithin(number, bottom, top) {
        return (number >= bottom && number <= top)
    }

    calcDist(crd, fromShip = false) {
        let sel
        if (!fromShip) sel = this.state.selected.split(';');
        else sel = this.props.gameMapState.shipLocation.cords
        return Math.sqrt((Math.pow(crd[0] - sel[0], 2) + Math.pow(crd[1] - sel[1], 2)))
    }

    hidePopup = () => this.setState({mousePos: {x: -10000, y: -10000}})

    render() {
        if (this.props.gameMapState.redirect === '/login') window.location.pathname = '/login'
        else if (this.props.gameMapState.redirect) return <Redirect to={this.props.gameMapState.redirect}/>;


        if (this.props.gameMapState.map) {
            let islandsLayerDrag = {
                start: (e) => {
                    this.setState({
                        drag: {x: this.state.drag.x, y: this.state.drag.y}
                    });
                },
                end: (e) => {

                    this.setState({drag: {x: e.target.x(), y: e.target.y()}})
                }
            }

            let stageMouse = {
                scroll: (e) => {

                    e.evt.preventDefault();
                    let newPs = this.state.pixelSize;
                    if (e.evt.deltaY < 0 && newPs < 200) newPs += 10;
                    else if (e.evt.deltaY > 0 && newPs > 10) newPs -= 10;
                    else return;

                    let canvas = this.refs.canvas.children[0].canvas._canvas;

                    //calculates mouse position relative to the canvas
                    let mousePos = {
                        x: e.evt.clientX - canvas.getBoundingClientRect().left,
                        y: e.evt.clientY - canvas.getBoundingClientRect().top
                    };

                    let offset = newPs / this.state.pixelSize;

                    let zoomIn = (offset > 1);

                    let totalOffset;
                    if (zoomIn)
                    //working zoom in
                        totalOffset = {
                            x: this.state.drag.x * offset - (this.state.drag.x + (mousePos.x) * (10 / this.state.pixelSize)),
                            y: this.state.drag.y * offset - (this.state.drag.y + (mousePos.y) * (10 / this.state.pixelSize))
                        };
                    else {
                        //working zoom out
                        totalOffset = {
                            x: this.state.drag.x * offset - (this.state.drag.x - (mousePos.x) * (10 / this.state.pixelSize)),
                            y: this.state.drag.y * offset - (this.state.drag.y - (mousePos.y) * (10 / this.state.pixelSize))
                        };
                    }

                    //updates the offsets
                    let newState = {
                        drag: {
                            x: this.state.drag.x + totalOffset.x,
                            y: this.state.drag.y + totalOffset.y
                        },
                        pixelSize: newPs
                    };

                    this.setState(newState)


                },
                move: (e) => {

                    if (!this.state.dataLayerIsFrozen) {
                        clearTimeout(this.state.timeout);
                        this.setState({
                            mousePos: {x: e.evt.offsetX, y: e.evt.offsetY},
                            timeout: setTimeout(this.hidePopup, 5000)
                        })
                    }

                },
                leave: () => {
                    //todo on mouse leave is not working
                    // on mouse out is spamming what to do?

                    this.setState({mousePos: {x: -10000, y: -10000}})
                }
            }

            let islandLayerMouse = {
                click: (e) => {
                    console.log(e)
                    if (e.evt.button === 2) {
                        e.evt.preventDefault();
                        if (this.state.dataLayerIsFrozen) this.hidePopup()
                        this.setState({dataLayerIsFrozen: !this.state.dataLayerIsFrozen})
                        clearTimeout(this.state.timeout)
                    }
                },
            }

            let islandsLayer = <Layer draggable
                                      x={this.state.drag.x}
                                      y={this.state.drag.y}
                                      onDragStart={islandsLayerDrag.start}
                                      onDragEnd={islandsLayerDrag.end}
                                      onMouseDown={islandLayerMouse.click}
            >
                {this.props.gameMapState.map.map((arr, x) => {
                    return arr.map((el, y) => {
                        let chunkMouse = {
                            over: () => {
                                if (!this.state.dataLayerIsFrozen) this.setState({mouseOver: x + ';' + y})
                            },
                            down: (e) => {
                                if (e.evt.button === 0) this.setState({selected: x + ';' + y})
                            }
                        }

                        let xPosChunk = this.state.pixelSize * x;
                        let yPosChunk = this.state.pixelSize * y;
                        // && xPosChunk < window.innerWidth && yPosChunk < window.innerHeight
                        let elementIsWithingView =
                            (xPosChunk + this.state.drag.x < window.innerWidth) &&
                            (xPosChunk + this.state.pixelSize > -this.state.drag.x - 250) &&
                            (yPosChunk + this.state.drag.y < window.innerHeight) &&
                            (yPosChunk + this.state.pixelSize > -this.state.drag.y - 250);

                        if (el && elementIsWithingView) {
                            let fillColor = (this.state.selected === x + ';' + y) ? ('#add') : ((this.state.mouseOver === x + ';' + y) ? "#89b717" : undefined);
                            if (!fillColor) {
                                if (this.isWithin(x, 0, 5) && this.isWithin(y, 0, 5)) fillColor = 'red';
                                if (this.isWithin(x, 26, 31) && this.isWithin(y, 0, 5)) fillColor = 'green';
                                if (this.isWithin(x, 0, 5) && this.isWithin(y, 26, 31)) fillColor = 'blue';
                                if (this.isWithin(x, 26, 31) && this.isWithin(y, 26, 31)) fillColor = 'yellow';
                                if (this.props.gameMapState.shipLocation.cords[0] === x && this.props.gameMapState.shipLocation.cords[1] === y) fillColor = 'magenta'
                            }

                            return (
                                <Group onMouseOver={chunkMouse.over} onMouseDown={chunkMouse.down}
                                       key={'gr ' + x + ';' + y}>
                                    <Image
                                        x={xPosChunk}
                                        y={yPosChunk}
                                        width={this.state.pixelSize}
                                        height={this.state.pixelSize}
                                        image={this.refs.water}
                                    />
                                    <Image
                                        x={xPosChunk}
                                        y={yPosChunk}
                                        width={this.state.pixelSize}
                                        height={this.state.pixelSize}
                                        image={this.refs[el.resource.type]}
                                        fill={fillColor}
                                        opacity={(this.state.mouseOver === x + ';' + y) ? 0.6 : 1}
                                    />
                                </Group>)
                        }
                        else if (elementIsWithingView) return <Image
                            onMouseOver={chunkMouse.over}
                            key={'water ' + x + ';' + y}
                            x={xPosChunk}
                            y={yPosChunk}
                            width={this.state.pixelSize}
                            height={this.state.pixelSize}
                            image={this.refs.water}/>
                    })
                })}
            </Layer>

            let islandCords = this.state.mouseOver.split(';');
            let selectedCords = this.state.selected.split(';');
            let islandData = this.props.gameMapState.map[islandCords[0]][islandCords[1]];
            let selectedData 
            if (this.state.selected) selectedData= this.props.gameMapState.map[selectedCords[0]][selectedCords[1]];
            let dataLayer
            let islandDist = (this.state.selected) ? (this.calcDist.bind(this)(islandCords)) : ('No Island Selected');
            let shipDist = this.calcDist.bind(this)(islandCords, true)
            if (shipDist === 0) shipDist = 'Your ship is here'
            if (islandData) dataLayer = <Layer x={this.state.mousePos.x + 5} y={this.state.mousePos.y + 5}>
                <Group>
                    <Rect width={200} height={130} fill={'#fff'} opacity={0.5}/>
                    <Text text={`${islandData.name}`} x={25} y={10} fontSize={15}/>
                    <Text text={`Coordinates: (${islandData.cords[0]};${islandData.cords[1]})`} x={10} y={35}/>
                    <Text text={`Owner: ${this.capitaliseFirstLetter(islandData.owner)}`} x={10} y={45}/>
                    <Text text={`Resource: ${this.capitaliseFirstLetter(islandData.resource.type)}`} x={10} y={55}/>
                    <Text
                        text={(islandData.resource.type !== 'none') ? `Production: ${islandData.resource.production.toFixed(2)} per hour ` : ''}
                        x={10} y={65}/>
                    <Text
                        text={(islandData.resource.type !== 'none') ? `Storage : ${islandData.resource.storage}; Decay: ${(100 * (1 - islandData.resource.multiplier)).toFixed(2)}% per hour` : ''}
                        x={10} y={75}/>
                    <Text text={`Distance:\n From Selected: ${islandDist}\n From Your Ship: ${shipDist}`} x={10}
                          y={85}/>

                </Group>
            </Layer>
            return (<div>
                <MapSideMenu selectedData={selectedData} islandData={islandData}  
                             shipLocation={this.props.gameMapState.shipLocation} distanceFromShip={this.calcDist.bind(this)(selectedCords, true)}/>
                <Stage ref={'canvas'}
                       onWheel={stageMouse.scroll}
                       onMouseMove={stageMouse.move}
                       width={window.innerWidth}
                       height={window.innerHeight}
                       onContextMenu={e => e.evt.preventDefault()}>
                    {islandsLayer}
                    {dataLayer}
                </Stage>
                <img src={islandImg} ref={'none'} style={{display: 'none'}}/>
                <img src={waterImg} ref={'water'} style={{display: 'none'}}/>
                <img src={stoneImg} ref={'stone'} style={{display: 'none'}}/>
                <img src={goldImg} ref={'gold'} style={{display: 'none'}}/>
                <img src={woodImg} ref={'wood'} style={{display: 'none'}}/>
                <img src={foodImg} ref={'food'} style={{display: 'none'}}/>
                <img src={metalImg} ref={'metal'} style={{display: 'none'}}/>
            </div>);
        }
        else return <h1>Map couldn't load</h1>
    }
}

const mapStateToProps = state => ({
    gameMapState: state.gameMapState,
    forwardRef: true,
})

export default connect(mapStateToProps, actionFunctions)(GameMap)