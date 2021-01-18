import React, { useEffect, useState } from 'react'
import { Octokit } from '@octokit/rest'
import Helmet from 'react-helmet'
import useSWR from 'swr'

import Head from '.../../components/head'
import Footer from '.../../components/footer'

// TODO : change authenticator to /admin rather than /links
import Authenticator from '.../../components/admin/links/authenticator'

import {
  Navbar,
  Breadcrumbs,
  Breadcrumb,
  ButtonGroup,
  Button as BButton,
  Popover,
  Tab, Tabs,
  Card,
  EditableText,
  MenuItem,
  TagInput,
  NumericInput,
  Alignment,
  PopoverPosition
} from '@blueprintjs/core'

import {
  Select,
} from '@blueprintjs/select'

import '@blueprintjs/core/lib/css/blueprint.css'


const breadcrumbs = [
  { href: '/admin', icon: "application" },
  { href: '/admin/links', text: 'links', current: true },
]

const breadcrumbRenderer = ({ text, ...props }) => {
  return <Breadcrumb {...props}>{text}</Breadcrumb>
}


const defaultLink = {
  id: 0,
  name: 'Untitled',
  type: 'news',
  category: 'other',
  tags: [],
  data: 'https://markspurgeon.ch',
}

const defaultCategory = {
  id: 0,
  slug: 'untitled',
  name: 'Untitled',
  order: 4,
  colour: 'green'
}

const types = [
  { name: 'news', icon: 'link' },
  { name: 'link', icon: 'globe-network'},
  { name: 'video', icon: 'film'},
]
const TypeSelect = Select.ofType();
const typeRenderer = (type, { handleClick }) => {
  return <MenuItem 
    active={type.active}
    key={type.name}
    onClick={handleClick}
    text={type.name}
    icon={type.icon}
  />
}

const CategorySelect = Select.ofType();
const categoryRenderer = (category, { handleClick }) => {
  return <MenuItem 
    active={category.active}
    key={category.slug}
    onClick={handleClick}
    text={category.slug}
  />
}

// Card that adds a new link
const NewLinkCard = ({ onClick }) => ( 
  <Card
    style={{
      marginRight: '1rem',
      marginBottom: '1rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <BButton icon="plus" minimal={true} fill={true} onClick={() =>  onClick()} />
  </Card>
)

// Card that contains a link
const LinkCard = ({
  input,
  categoryOptions,
  onUpdate,
}) => {
  let [item, setItem] = useState(input);

  useEffect(() => {
    if (input && item && input !== item) {
      // delay slightly, to avoid lag
      onUpdate(item);
    }
  }, [input, item])

  return (
    <Card style={{marginBottom: '1rem', marginRight: '1rem', backgroundColor: input.status === 'new' ? 'rgb(80, 225, 140)' : 'auto' }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between'}}>
        <div style={{ flex: '1 1 auto', display:'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'auto', padding: '5pt 8pt 3pt 8pt'}}>
          <h3 style={{marginTop: 0, marginBottom: 4, fontSize: '1.25rem'}}>
            <EditableText 
              value={item.name}
              onChange={(value) => setItem({...item, name: value})}
            />
          </h3>
          <span style={{color: 'rgb(50, 80, 255)'}}>
            <EditableText
             value={item.data}
             onChange={(value) => setItem({...item, data: value})}
            />
          </span>

          <TagInput disabled={item.type === 'link'} leftIcon="tag" values={item.tags} onChange={(values) => setItem({...item, tags: values})} />
        </div>
        <div style={{ padding: '5pt 0 3pt 0'}}>
          <ButtonGroup vertical={true} alignText='left'>
            
            <TypeSelect
              items={types.map(t => ({ ...t, active: item.type === t.name })) }
              itemRenderer={typeRenderer}
              filterable={false}
              popoverProps={{ position: PopoverPosition.LEFT }}
              onItemSelect={(it) => setItem({...item, type: it.name })}
            >
              <BButton icon={types.filter(t => item.type === t.name)[0].icon} outlined={true} title="Type" fill={true} />
            </TypeSelect>

            <CategorySelect
              items={categoryOptions.map(c => ({ ...c, active: item.category === c.slug })) }
              itemRenderer={categoryRenderer}
              filterable={false}
              popoverProps={{ position: PopoverPosition.LEFT }}
              onItemSelect={(it) => setItem({...item, category: it.slug })}
            >
              <BButton icon="projects" outlined={true} title="Category" fill={true} />
            </CategorySelect>
            
            <Popover position={PopoverPosition.BOTTOM} intent="danger">
              <BButton
                icon="delete"
                intent="danger"
              />
              <div>
                <BButton
                  icon="delete"
                  text="Really ?"
                  intent="danger"
                  minimal={true}
                  onClick={() => setItem({ ...item, status: 'deleted'})}
                />
              </div>
            </Popover>
          </ButtonGroup>
        </div>
      </div>
    </Card>
  )
}

const LinkList = ({ data, onNewLink, onUpdatedLink }) => {
  let links;
  if (data && data.items && data.categories) {
    links = data.items.map((link, index) => { 
      return (link.status === 'visible' || link.status === 'new') ? (
        <LinkCard 
          input={link}
          index={index}
          key={link.id}
          onUpdate={(val) => onUpdatedLink(val)}
          categoryOptions={data.categories}
          />
      ) : null;
    });
  }

  return (
    <>
      <NewLinkCard onClick={() => onNewLink()} />
      {links}
    </>
  )
}

const CategoryCard = ({ input, onUpdate }) => {
  let [category, setCategory] = useState(input);

  useEffect(() => {
    if (input !== category) {
      onUpdate(category)
    }
  }, [input, category])

  return (
    <Card style={{ marginBottom: '1rem', marginRight: '1rem' }}>
      <div style={{display: 'flex', flexDirection:'row'}}>
        <div style={{flex: '1 1 auto', display: 'flex', flexDirection: 'column'}}>
          <h3 style={{marginTop: 0}}>
            <EditableText value={category.name} onChange={(value) => setCategory({ ...category, name: value })} />
          </h3>
          <EditableText intent="danger" value={category.slug} onChange={(value) => setCategory({ ...category, slug: value })} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column'}}>
          <NumericInput
            style={{maxWidth: '2rem'}}
            value={category.order}
            onValueChange={(value) => setCategory({ ...category, order: value })}
            />
        </div>
      </div>


    </Card>
  )
}

const CategoryList = ({ data, onNewCategory, onUpdatedCategory }) => {
  let categories;
  if (data && data.categories) {
    categories = data.categories.map(category => (
      <CategoryCard 
        input={category} 
        key={category.id}
        onUpdate={(val) => onUpdatedCategory(val)} 
        />
    ))
  }

  return (
    <>
      <NewLinkCard onClick={() => onNewCategory()} />
      {categories}
    </>
  )
}

export default () => {
  const [uiEditor, setUiEditor] = useState('links')
  const [uiDataChanged, setUiDataChanged] = useState(false)
  const [uiCategoryOptions, setUiCategoryOptions] = useState([])
  const [authToken, setAuthToken] = useState(null)
  // const [remoteData, setremoteData] = useState([])
  const [data, setData] = useState([])

  const { data: remoteData, error } = useSWR('/api/links')

  // On remote data change,
  // change local data
  useEffect(() => {
    if (remoteData !== data) {
      setData(remoteData);
    }
  }, [remoteData])

  // Push local (changed) data to remote
  const uploadData = (newData) => {
    let newd = {
      ...newData,
      items: newData.items.map(i => ({...i, status: 'visible'}))
    }

      const octokit = new Octokit({
        auth: authToken
      })
      
      octokit.repos.getContent({
        owner: "the-duck",
        repo: "databases",
        path: 'links.json',
      })
      .then(({ data }) => {
        octokit.repos.createOrUpdateFileContents({
          owner: 'the-duck',
          repo: 'databases',
          path: 'links.json',
          message: `Update from website [general]`,
          content: Buffer.from(JSON.stringify(newd, null, 2)).toString("base64"),
          sha: data.sha,
          committer: {
            name: 'the-duck',
            email: 'markspurgeon96@hotmail.com',
          }
        })
      })
      .catch(error => console.warn(error))
  }

  // Update category
  const onUpdatedCategory = (updatedCategory) => {
    let newData = {
      ...data,
      categories: [
        ...data.categories.filter(cat => cat.id !== updatedCategory.id),
        updatedCategory,
      ].sort((a, b) => a.order - b.order)
    }
    setData(newData)
  }

  // Update link
  const onUpdatedLink = (updatedLink) => {    
    let newLinks = [
      ...data.items.filter(link => link.id !== updatedLink.id),
      updatedLink,
    ]
    .filter(link => link.status !== 'deleted')
    .sort((a,b) => b.id - a.id)
    
    let newData = { ...data, items: newLinks }

    setData(newData)
  }

  // Add category
  const onNewCategory = () => {
    console.log('hey, new category here')
    let newCategory = {
      ...defaultCategory,
      order: data.categories.length,
      id: Date.now(),
    }
    
    let newCategories = [ ...data.categories, newCategory ]
    newCategories = newCategories.sort((a,b) => b.order - a.order)

    let newData = { ...data, categories: newCategories }
    setData(newData)
  }

  // Add link
  const onNewLink = () => {
    let newItem = {
      ...defaultLink,
      status: 'new',
      id: Date.now(),
    }

    let newItems = [ ...data.items, newItem ]
    newItems = newItems.sort((a,b) => b.id - a.id)

    let newData = { ...data, items: newItems }
    setData(newData)
  }

  return (
    <main>
      <Helmet>
        <Head />
        <title>Admin / Links / Mark Spurgeon</title>
        <meta name="robots" content="noindex"></meta>
      </Helmet>
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Breadcrumbs 
            currentBreadcrumbRenderer={breadcrumbRenderer}
            items={breadcrumbs}
            collapseFrom='end'
            minVisibleItems={1}
          />
        </Navbar.Group>

        <Navbar.Group align={Alignment.RIGHT}>
          <Popover isOpen={authToken ? false : true}>
            <BButton icon="user" minimal={true} intent={authToken ? 'success' : 'danger'} />
            <Authenticator onAuth={setAuthToken} />
          </Popover>
          <Navbar.Divider />
          <BButton icon="refresh" text="update" disabled={(authToken && remoteData !== data) ? false : true} onClick={() => uploadData(data)} />
        </Navbar.Group>
      </Navbar>

      <div style={{paddingLeft: '1rem', maxWidth: '40rem', margin: '0 auto'}}>
        <Tabs large={true}  defaultSelectedTabId="links">
          <Tab
            id="categories"
            title="Categories"
            panel={<CategoryList data={data} onNewCategory={onNewCategory} onUpdatedCategory={onUpdatedCategory} />} 
            />
          <Tab 
            id="links" 
            title="Links" 
            panel={<LinkList data={data} onNewLink={onNewLink} onUpdatedLink={onUpdatedLink} />}
            />
          <Tabs.Expander />
        </Tabs>
      </div>
  
      <Footer />
    </main>
  )
}