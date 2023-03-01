import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../Components/Input';
import Btn from '../Components/Button';
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import { useQuery, useMutation } from "react-query";
import { EditMyInfo } from '../axios/api';

function Mypages() {
    const navigate = useNavigate();


    const EditInfo = useMutation(EditMyInfo, {
        onSuccess: () => {
            console.log('성공일걸용? ')
        }
    });

    const getToken = Cookies.get('token');
    //마이페이지에서 새롭게 추가할 항목들

    const [selectedPart, setSelectedPart] = useState('');
    const [introduction, setIntroduction] = useState('');

    const selectPartHandler = (e) => {
        setSelectedPart(e.target.value);
    }

    const introductionEditButton = (e) => {
        setIntroduction(e.target.value);
    }

    const info = sessionStorage.getItem("userInfo")
    const USERINFO = JSON.parse(info)

    console.log("세션스토리지", USERINFO)

    const [nickName, setNickName] = useState(`${USERINFO.nickname}`)
    // 
    const nickNameEditHandler = (e) => {
        setNickName(e.target.value)
    }



    const data = {
        id: USERINFO.id,
        nickName: nickName,
        introduction: introduction,
        part: selectedPart,
    }


    const sessiondata = {
        id: USERINFO.id,
        username: USERINFO.username,
        nickName: nickName,
        introduction: introduction,
        part: selectedPart,
    }

    console.log("수정후저장할값", sessiondata)
    // 토큰이랑 수정값 보내기 
    const EditMyInfoChangeHandler = async (e) => {
        e.preventDefault();
        // 수정될 값을 리액트쿼리로 처리 
        EditInfo.mutate({ getToken, data })
        // 기존에 세션스토리지 삭제
        sessionStorage.removeItem("userInfo")
        // 새로운 세션스토리지 
        sessionStorage.setItem("userInfo", JSON.stringify(sessiondata))
        navigate('/');
    }


    return (
        <div>
            <MyPageArea onSubmit={EditMyInfoChangeHandler}>

                <StInfoLayout>
                    <StInfoBox>ID</StInfoBox>
                    {USERINFO.username}
                </StInfoLayout>
                <StInfoLayout>
                    <StInfoBox>NickName</StInfoBox>
                    <Input
                        type="text"
                        style={{ border: 'none', marginRight: '20px' }}
                        value={nickName}
                        onChange={nickNameEditHandler}
                        me />
                    {/* <Btn onClick={EditNickNameChangeHandler} me>
                        변경
                    </Btn> */}
                    <div>2~6자 영문 한글로 작성</div>
                </StInfoLayout>

                <StInfoLayout>
                    <StInfoBox>Part</StInfoBox>

                    <StSelectBox>
                        <h4>Backend</h4>
                        <input
                            style={{ width: '20px', height: '20px' }}
                            type="radio"
                            name="select"
                            onChange={selectPartHandler}
                            value="Backend"
                            required
                        />
                        <h4>Frontend</h4>
                        <input
                            style={{ width: '20px', height: '20px' }}
                            type="radio"
                            name="select"
                            onChange={selectPartHandler}
                            value="Frontend"
                            required
                        />
                        {/* <Btn me>변경</Btn> */}
                    </StSelectBox>
                </StInfoLayout>
                <StInfoLayout style={{ minHeight: '150px' }}>
                    {''}
                    <StInfoBox>Introduce</StInfoBox>
                    <StTextArea type="text"
                        onChange={introductionEditButton} required />
                    {/* <Btn me onClick={introductionEditButton}>
                        변경
                    </Btn> */}
                </StInfoLayout>


                <EditButtonArea>
                    <Btn me
                        type="submit">내정보 수정</Btn>
                </EditButtonArea>


            </MyPageArea>
        </div>
    );
}

export default Mypages;

const MyPageArea = styled.form`
    width: 50rem;
    height: 35rem;
    border: 2px solid #000;
    margin: 50px auto;
`;

// 마이페이지 레이아웃
const StInfoLayout = styled.div`

    width: 36.875rem;
    height: 3.75rem;
    display: flex;
    align-items: center;
    margin: 25px auto;
    border-radius: 5px;
    margin-bottom: 20px;
    /* border: 1px solid black;  */
`;

// 정보 박스 레이아웃
const StInfoBox = styled.div`
    width: 6.875rem;
    height: 3.125rem;
    border-radius: 5px;
    box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
    align-items: center;
    justify-content: center;
    display: flex;
    margin-right: 20px;
`;

// 파트 선택
const StSelectBox = styled.div`
    width: 18.75rem;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    margin-left: 10px;
    /* border: 1px solid black; */
`;

// 소개글
const StTextArea = styled.textarea`
    width: 340px;
    height: 7.8125rem;
    border-radius: 10px;
    padding: 15px;
    margin-right: 20px;
    border: none;
    outline: none;
`;

const EditButtonArea = styled.div`
    width: 12.5rem;
    margin: 0 auto;
`
