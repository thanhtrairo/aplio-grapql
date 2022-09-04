import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import {
  GetUsersDocument,
  GetUsersQuery,
  GetUserDocument,
  useGetUserQuery,
  User,
  GetUserQuery,
  useUpdateUserMutation,
} from '../../generated/graphql'
import { addApolloState, initializeApollo } from '../../lib/apolloClient'

function UserDetail() {
  const router = useRouter()

  const [state, setState] = useState<User>({
    name: '',
    age: '',
    email: '',
    password: '',
    isAdmin: false,
  })

  const [updateUserMutation, { loading: loadingUpdate }] = useUpdateUserMutation()

  const { data, loading } = useGetUserQuery({
    variables: { id: router.query.id as string },
  })
  if (loading) return <h1>loading...</h1>

  const handleForm = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    await updateUserMutation({
      variables: {
        id: router.query.id as any,
        email: state.email,
        name: state.name,
        age: state.age,
      },
    })
  }

  return (
    <div
      style={{
        width: '800px',
        margin: '20px auto 0',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        minHeight: 600,
      }}
    >
      <div style={{ width: '35%', margin: '0 auto' }}>
        <Image src="/avatar.jpg" alt="avatar" width={100} height={100} style={{ borderRadius: '50%' }} />
        <form>
          <p>
            Name:{' '}
            <input
              type="text"
              name="name"
              value={state.name || ''}
              placeholder={data?.user?.name || ''}
              onChange={(e) => handleForm(e)}
            />
          </p>
          <p>
            Age:{' '}
            <input
              type="text"
              name="age"
              value={state.age || ''}
              placeholder={data?.user?.age || ''}
              onChange={(e) => handleForm(e)}
            />
          </p>
          <p>
            Email:{' '}
            <input
              type="text"
              name="email"
              value={state.email || ''}
              placeholder={data?.user?.email || ''}
              onChange={(e) => handleForm(e)}
            />
          </p>
          <p>
            Position:{' '}
            <select value={state.isAdmin ? 'Leader' : 'Member'} onChange={(e) => handleForm(e)} name="isAdmin">
              <option value="Leader">Leader</option>
              <option value="Member">Member</option>
            </select>
          </p>
          <button type="submit" onClick={(e) => handleSubmit}>
            Update
          </button>
          {loadingUpdate && <span style={{ fontSize: 14, color: 'green', marginLeft: 10 }}>update success</span>}
        </form>
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query<GetUsersQuery>({
    query: GetUsersDocument,
  })

  return {
    paths: data.users!.map((post) => ({
      params: { id: `${post?.id}` },
    })),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<{ [key: string]: any }, { id: string }> = async ({ params }) => {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: GetUserDocument,
    variables: { id: params?.id },
  })

  return addApolloState(apolloClient, { props: {} })
}

export default UserDetail
