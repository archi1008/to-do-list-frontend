import React, { useEffect,useState } from 'react';
import {Navbar, Table, Container, Row, Col, Button, ButtonGroup, Form,FormCheck} from 'react-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import { addTask, deleteTask, loadSingleTask, loadTasks, updateTask, updateTaskStatus } from './redux/actions';
import { toast } from 'react-toastify';

const initialState={
  title : "",
  timings: "",
  priority:""
}
const Home = ()=>{
    const [state, setState] = useState(initialState);
    const [editMode, setEditMode] = useState(false);
    const [taskId, setTaskId] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const dispatch = useDispatch();
    const {tasks,msg,task} = useSelector(state=>state.data)
    useEffect(()=>{
        dispatch(loadTasks())
    },[]);
    let reqMsg = msg.includes('Deleted')?'Task deleted Successfulyy' : 'Task added Successfully'
    useEffect(()=>{if(msg) toast.success(reqMsg)},[msg])
    useEffect(()=>{if(task){setState({...task})}},[task])
    const{title,time,priority} = state;
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!editMode){
            dispatch(addTask(state));
            setState({title:"",time:"",priority:""});
        }
        else{
            dispatch(updateTask(state, taskId))
            setState({title:"",time:"",priority:""});
            setEditMode(false)
            setTaskId(null);
        }
        
    }
    const handleChange = (e)=>{
        let{name,value} = e.target;
        setState({...state, [name]: value});
    }
    const handleStatus = (id)=>{
        dispatch(updateTaskStatus(id))
    }
    const handleDelete = (id)=>{
       if(window.confirm("Are you Sure you want to Delete this task?")){
        dispatch(deleteTask(id));
       }
    }
    const handleUpdate = (id)=>{
        dispatch(loadSingleTask(id));
        setEditMode(true);
        setTaskId(id);
    }
    const handleSort = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
        // Dispatch an action to trigger the sorting based on the newSortOrder
        // For example:
        // dispatch(sortTasks(newSortOrder));
      };
 return(
    <React.Fragment>
    <Navbar bg="primary" variant='dark' className='justify-content-center'>
        <Navbar.Brand>Your To-Do-List</Navbar.Brand>
    </Navbar>
    <Container style={{marginTop:'70px'}}>
        <Row>
            <Col md={4}>
                <Form onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Label>Title</Form.Label>
                     <Form.Control type='text' placeholder='Enter Title' name='title' value={title || ""} onChange={handleChange}/>
                     <Form.Label>Time</Form.Label> 
                     <Form.Control type='time' placeholder='Enter Time' name='time' value={time || ""} onChange={handleChange}/>
                     <Form.Label>Priority</Form.Label>
                     <Form.Control type='number' placeholder='Set Priority' name='priority' value={priority || ""} onChange={handleChange}/>
                  </Form.Group>
                  <div className='d-grid gap-2 mt-2'>
                    <Button type='submit' variant='primary' size='lg'>{editMode? 'Update': 'Submit'}</Button>
                  </div>

                </Form>
            </Col>
            <Col md={8}>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Title</th>
                            <th>Timings</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Actions <Button style={{marginLeft:'10px'}} onClick={handleSort}>Sort</Button></th>
                        </tr>
                    </thead>
                    {tasks && tasks
    .sort((a, b) => {
      // Compare the title values based on the sortOrder
      if (sortOrder === 'asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    }).map((item,index)=>{return(
                       <tbody key={index}>
                         <tr>
                            <td>{index +1}</td>
                            <td>{item.title}</td>
                            <td>{item.time}</td>
                            <td>{item.priority}</td>
                            <td>{item.status==='pending'?(<FormCheck inline style={{marginLeft:'20px'}}  onClick={()=>{handleStatus(item._id)}}/>): 'Completed'}</td>
                            <td>
                                <ButtonGroup>
                                    <Button style={{marginRight:"5px"}} variant='danger' onClick={()=>{handleDelete(item._id)}}>
                                        Delete
                                    </Button>
                                    <Button variant='secondary' onClick={()=>{handleUpdate(item._id)}}>
                                        Update
                                    </Button>
                                </ButtonGroup>
                            </td>
                         </tr>
                       </tbody>)
                    })}
                </Table>
            </Col>
        </Row>
    </Container>
    </React.Fragment>
 )
}

export default Home;