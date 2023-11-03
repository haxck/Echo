import { useState } from 'react'

import '../App.css'
import { Flex, Text, Button,TextField, Box, Container } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';

function Root() {
  const [code,setCode] = useState(null)
  const navigator = useNavigate()

  const onAction = () => {
    navigator(`/letter/${code}`)
  }
  return (
    <>
      <Container size={3}>
      <h1>Echo</h1>
      <Flex direction="column" gap="3" width={9} >
        <TextField.Root>
          <TextField.Input placeholder="请输入取信码" value={code} onChange={(e)=>{setCode(e.target.value)}} style={{textAlign: "center"}}/>
        </TextField.Root>
        <Button onClick={onAction}>Let's go</Button>
      </Flex>
      </Container>
    </>
  )
}

export default Root
