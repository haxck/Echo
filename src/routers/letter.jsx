import { useState } from 'react'

import '../App.css'
import { Flex, Text, Button, TextField, Box, Container } from '@radix-ui/themes';
import { useLoaderData, useParams } from 'react-router';


export default function Letter() {
  let params = useLoaderData()
  return (
    <>

        <div className="topbar"></div>
        <div className="paper">
          <p>{params.createTime}</p>
          <hr />
          <p>{params.content}</p>
        </div>


    </>
  )
}

