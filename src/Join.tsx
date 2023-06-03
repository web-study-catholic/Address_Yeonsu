import { useForm, SubmitHandler } from "react-hook-form";
import {useNavigate } from "react-router-dom";
import React, { useState, useRef } from "react";
import * as S from "./JoinStyle";
import axios from "axios";
import MapSelector from "./utils/MapSeletor";
import { SignupProps } from "./constant/interfaces";

const SignupForm = () => {
  const navigate = useNavigate();
  

	const { 
    register, 
    handleSubmit, 
    watch, 
    getValues,
    formState: { errors }, 
  } = useForm<SignupProps>({
    mode : "onChange",
    defaultValues: { username: "",nickname: "",email: "",password: "", passwordConfirm:""},
  });

    console.log(watch());
    const passwordRef = useRef<string | null>(null);
    passwordRef.current = watch("password");
    const [, setSelectedLocation] = useState("");
    const [,setIdCheckResult] = useState("");
    const [,setNicknameResult] = useState("");
    const [,setEmailCheckResult] = useState("");
    const handleMapSelection = (sido:string, sigugun:string, dong:string) => {
      const address = `${sido} ${sigugun} ${dong}`;
      setSelectedLocation(address);
      console.log(sido, sigugun, dong);
    }

    const idCheckRes = async (data : SignupProps) => {
          try{
            const {username} = data;
            const CheckRes = await axios.get(`http://localhost/auth/exist/username/${username}`);
            if(CheckRes.data.exist === true) {
              throw new Error("이미 사용중인 username입니다.");
            }
            console.log("사용가능한 아이디");
            alert("사용가능한 아이디입니다.");
            setIdCheckResult("사용가능한 username입니다");
          } catch(error) {
            console.log(error);
          }
    };

    const NicknameCheckRes = async (data : SignupProps) => {
      try{
        const {nickname} = data;
        const CheckRes = await axios.get(`http://localhost/auth/exist/nickname/${nickname}`);
        if(CheckRes.data.exist === true) {
          throw new Error("이미 사용중인 username입니다.");
        }
        console.log("사용가능한 아이디");
        alert("사용가능한 닉네임입니다.")
        setNicknameResult("사용가능한 닉네임입니다");
      } catch(error) {
        console.log(error);
      }
    };

    const EmailCheckRes = async (data : SignupProps) => {
      try{
        const {email} = data;
        const CheckRes = await axios.get(`http://localhost/auth/exist/email/${email}`);
        if(CheckRes.data.exist === true) {
          throw new Error("이미 사용중인 username입니다.");
        }
        console.log("사용가능한 이메일입니다.");
        setEmailCheckResult("사용가능한 이메일입니다");
      } catch(error) {
        console.log(error);
      }
    };    
  

    const onSubmitHandler: SubmitHandler<SignupProps> = (data) => {
      console.log(data);
      const formData = {
        username: data.username,
        nickname : data.nickname,
        email : data.email,
        password: data.password,
        location: setSelectedLocation,
      }

      axios.post("http://localhost:8080/auth/signup", formData,{
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((res) => {
        console.log("Signup Success!");
        console.log(res.data);
        navigate("/login");
      })
      .catch((error) => {
        console.log("SignUp Error:", error);
      })
    
    }

  return (
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <S.FormContainer>
        <S.Test to={"/main"}>
          <S.Div><S.p>Join Us</S.p></S.Div>
        </S.Test>
          <S.Div>
            <label>ID</label>
          </S.Div>
          <div>
            <S.Input placeholder="ID을 입력해주세요." {...register("username", { required: true })} />
            <span>
             <S.E_button type="button" onClick={()=>idCheckRes}>중복체크</S.E_button>
            </span>
          </div>
          {errors.username && <div>ID를 작성해주세요!</div>}
          <S.Div>
            <label>Nick Name</label>
          </S.Div>
          <div>
            <S.Input placeholder="6글자 이내로 입력해주세요" {...register("nickname", { required: true, maxLength: 4 })} />
            <span>
             <S.E_button type="button" onClick={()=>NicknameCheckRes}>중복체크</S.E_button>
            </span>
          </div>
          {errors.nickname && errors.nickname.type === "maxLength" && (
            <div>닉네임는 4글자 이내로 작성해주세요!</div>
          )}

	        <S.Div><label>email</label></S.Div>
        	<div>
            <S.Input
            type="text"
            placeholder="test@email.com"
            // input의 기본 config를 작성
            {...register("email", {
              required: "이메일은 필수 입력입니다.",
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                message: "이메일 형식에 맞지 않습니다.",
              },
            })}
          />
          <span>
             <S.E_button type="button" onClick={()=>EmailCheckRes}>중복체크</S.E_button>
            </span>
          </div>
          {errors.email && <small role="alert">{errors.email.message}</small>}
          <S.Div><label>password</label></S.Div>
        	<div><S.Input placeholder=" 영문 대/소문자, 특수문자 포함 8글자 이상 입력해주세요" {...register("password", { 
          required: true, 
          minLength: 8,
          pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
          })} 
          type="password" />
          </div>
          {errors.password && errors.password.type === "required" && (
            <div>비밀번호를 입력해주세요.</div>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <div>비밀번호는 8자 이상 입력해주세요.</div>
          )}
          {errors.password && errors.password.type === "pattern" && (
            <div>비밀번호는 영문 대/소문자, 숫자, 특수문자를 포함해 8글자 이상 입력해주세요.</div>
          )}

	      <S.Div><label>password_confirm</label></S.Div>
        <div><S.Input placeholder=" 비밀번호를 동일하게 입력해주세요" {...register("passwordConfirm", { required: true,
            validate: (value) => value === passwordRef.current})} type="password" />
        </div>
          {errors.passwordConfirm && errors.passwordConfirm.type === "required" && (
            <div>비밀번호를 다시 한번 입력해주세요.</div>
          )}
          {errors.passwordConfirm && errors.passwordConfirm.type === "validate" && (
            <div>비밀번호가 일치하지 않습니다.</div>
          )}
        <div><label> select region</label></div>
        <S.map>
          <MapSelector
            onSelect={handleMapSelection}
          />
        </S.map>
        <S.Button type="submit">Sign Up</S.Button>
      </S.FormContainer>
      </form>
  );
};


export default SignupForm;