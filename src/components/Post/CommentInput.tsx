import { useFormik } from "formik";
import React from "react";
import { AiOutlineSmile } from "react-icons/ai";
import styled from "styled-components";
import { createComment } from "../../services/CommentService";
import * as Yup from "yup";
import Comment from "../../services/response/comment-response";

const CreateCommentWrapper = styled.form`
  width: 100%;
  border-top: solid 1px #dbdbdb;
  padding: 4px 12px;
`;

const CommentInputContainer = styled.div`
  display: flex;
  width: 100%;
  height: 40px;

  & input {
    background: none;
    border: none;
    flex-grow: 1;

    &:focus {
      outline: none;
    }
  }
`;

const CreateCommentButton = styled.button`
  background: none;
  border: none;
  color: #0095f6;
  font-size: 14px;
  font-weight: bold;
`;

const IconButton = styled.button`
  padding: 8px;
  border: none;
  background: none;
`;

const SelectEmojiButton = styled(IconButton)`
  padding-left: 0;
`;

interface CommentInputProperties {
  postId: string;
  setCurrentComments: (value: any) => void;
  currentComments: Comment[];
}
export default function CommentInput({
  postId,
  currentComments,
  setCurrentComments,
}: CommentInputProperties) {
  const formik = useFormik({
    initialValues: {
      commentInput: "",
    },
    validationSchema: Yup.object({
      commentInput: Yup.string()
        .max(200, "Must be 200 characters or less")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);

      createComment({
        postId: postId,
        body: values.commentInput,
      })
        .then((response) => {
          console.log(response);
          const newComments = [...currentComments];
          newComments.push(response.data);
          setCurrentComments(newComments);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  return (
    <CreateCommentWrapper onSubmit={formik.handleSubmit}>
      <CommentInputContainer>
        <SelectEmojiButton>
          <AiOutlineSmile size={24} />
        </SelectEmojiButton>
        <input
          id="commentInput"
          name="commentInput"
          placeholder="Ваш комментарий"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.commentInput}
        />
        <CreateCommentButton type="submit">Create</CreateCommentButton>
      </CommentInputContainer>
    </CreateCommentWrapper>
  );
}
