import * as React from 'react';
import Particles from 'react-tsparticles';
import { IOptions, RecursivePartial } from 'tsparticles';

interface IProps {
  options: RecursivePartial<IOptions>;
}

export default class ParticlesContainer extends React.PureComponent<IProps> {
  render() {
    return <Particles options={this.props.options} />;
  }
}
