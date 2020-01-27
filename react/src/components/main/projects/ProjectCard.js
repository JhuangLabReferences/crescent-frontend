import React, {useState, useEffect} from 'react';

import * as R from 'ramda'
import * as RA from 'ramda-adjunct'
import * as R_ from 'ramda-extension'
import moment from 'moment'

import filesize from 'filesize'

import {Form, Card, Header, Transition, Button, Container, Modal, Label, Divider, Icon, Image, Popup} from 'semantic-ui-react'

import withRedux from '../../../redux/hoc'

import Marquee from 'react-marquee'

const ProjectCard = withRedux(({
  // Redux
  actions: {setProject},
  // Prop
  project
}) => {
  const {
    projectID,
    name,
    description,
    createdBy: {name: creatorName},
    createdOn,

    runs,
    // Has props
    // {
    //   runID,
    //   name,
    //   status
    // }
    datasetSize
  } = project
  return (
    <Transition visible animation='fade up' duration={500} unmountOnHide={true} transitionOnMount={true}>
    <Card link onClick={() => setProject(project)} color='grey'>
      <Popup
          size='large' wide='very'
          inverted
          trigger={
            <Button attached='top' color='grey' animated='vertical'>
              <Button.Content visible>
                <Icon name='folder open' size='large' />
              </Button.Content>
              <Button.Content hidden>
                <Icon name='eye' size='large' />
              </Button.Content>
            </Button>
          }
          content={description}
        />
      <Card.Content>
        <Card.Header>
          <Header size='small'>
            <Header.Content>
            {name}
            </Header.Content>
          </Header>
        </Card.Header>
      </Card.Content>
      <Card.Content>
        <Label.Group>
          <Label content={<Icon style={{margin: 0}} name='user' />} detail={creatorName} />
          <Label content={<Icon style={{margin: 0}} name='calendar alternate outline' />} detail={moment(createdOn).format('DD MMM YYYY')} />
          <Label content={<Icon style={{margin: 0}} name='file archive' />} detail={'#'} />
          <Label content={<Icon style={{margin: 0}} name='save' />} detail={filesize(datasetSize)} />
        </Label.Group>
      </Card.Content>
      <Card.Content>
        <Button.Group widths={4}>
        {
          R.compose(
            R.flatten,
            R.props(['pending', 'submitted', 'completed', 'failed']),
            R.mapObjIndexed((runs, status) => {
              const statusColor = R.prop(status, {
                pending: 'orange',
                submitted: 'yellow',
                completed: 'green',
                failed: 'red'
              })
              return (
                <Popup key={status} size='large'
                  wide='very'
                  trigger={
                    <Button
                      size='small'
                      animated='vertical'
                      color={statusColor}
                    >
                      <Button.Content hidden
                        content={
                          R_.joinWithSpace([
                            R.length(runs),
                            R.toUpper(status),
                          ])
                        }
                      />
                      <Button.Content visible>
                      {R.length(runs)}
                      {' '}
                        <Icon
                              style={{margin: 0}}
                              name={R.prop(status, {
                                pending: 'circle outline',
                                submitted: 'circle notch',
                                completed: 'circle outline check',
                                failed: 'circle exclamation'
                              })}
                              loading={R.equals('submitted', status)}
                            />
                      </Button.Content>
                    </Button>
                  }
                  content={
                    <Label.Group color={statusColor}>
                    {
                      R.ifElse(
                        R.isEmpty,
                        R.always(`No ${status} runs`),
                        RA.mapIndexed(
                          ({runID, name}, index) => (
                            <Label key={index}>
                              {name}
                            </Label>
                          )
                        )
                      )(runs)
                    }
                    </Label.Group>  
                  }
                />
              )
            }),
            R.reduce(
              (runsByStatus, run) => R.over(
                R.lensProp(R.prop('status', run)),
                R.append(run),
                runsByStatus
              ),
              {pending: [], submitted: [], completed: [], failed: []}
            )
          )(runs)
        }
        </Button.Group>
      </Card.Content>
    </Card>
    </Transition>
  )
})


export default ProjectCard