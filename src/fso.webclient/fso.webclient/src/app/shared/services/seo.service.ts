import { Injectable } from '@angular/core'
import { Meta, Title } from '@angular/platform-browser'
import { PostPart } from '../models/postpart';

export interface SEONode {
  title?: string
  description?: string
  img?: SEOImage
  type?: string
  url?: string
  locale?: string
  facebookAppId?: string
  tags?: string[]
}

export interface SEOImage {
  url?: string
  alt?: string
  type?: string
  height?: number
  width?: number
}

@Injectable()
export class SEOService {
  constructor(private title: Title, private meta: Meta) { }

  updateHome(){
    this.clearTags();
    this.updateTitle('Home');
    this.updateDescription('feasion is a fashion ranking platform');
  }
  updateNotificationPage(){
    this.clearTags();
    this.updateTitle('Notifications');
  }
  updateUserPage(userInfo: any){
    this.clearTags();
    this.updateTitle(userInfo.username);
    this.updateDescription(userInfo.status);
    this.updateImg({url: userInfo.profileImageUrl});
  }
  updateCollectionPage(collection:any){
    this.clearTags();
  }
  updateInterestPage(interest:any){
    
  }
  updatePostPage(post: any){
    this.clearTags();
    this.updateTitle(post.title + " - " + post.authorInfo.username);
    this.updateDescription(post.description);
    for(let i =0;i<post.postParts.length;i++){
      const img: SEOImage = {
        url:post.postParts[i].image.url,
        alt:post.title
      }      
      this.addImg(img);  
    }  
  }
  updateNode(node: SEONode) {
    if (node.title) this.updateTitle(node.title)
    if (node.description) this.updateDescription(node.description)
    if (node.img) this.updateImg(node.img)
    if (node.title) this.updateType(node.type)
    if (node.url) this.updateUrl(node.url)
    if (node.title) this.updateLocale(node.locale)
    if (node.facebookAppId) this.updateFbAppId(node.facebookAppId)
    if (node.tags) this.updateTags(node.tags)
  }

  updateTitle(title: string) {
    const titleAfterfix = " - feasion"
    this.title.setTitle(title + titleAfterfix);
    this.meta.updateTag(this.createOgTag('title', title))
  }

  updateDescription(desc: string) {
    this.meta.updateTag({ name: 'description', content: desc })
    this.meta.updateTag(this.createOgTag('description', desc))
  }

  updateFbAppId(id: string) {
    this.meta.updateTag({ property: 'fb:app_id', content: id })
  }

  updateImg(img: SEOImage) {
    if (img.url) this.meta.updateTag(this.createOgTag('image', img.url, 'url'))
    if (img.width) this.meta.updateTag(this.createOgTag('image', img.width.toString(), 'width'))
    if (img.height) this.meta.updateTag(this.createOgTag('image', img.height.toString(), 'height'))
    if (img.type) this.meta.updateTag(this.createOgTag('image', img.type, 'type'))
    if (img.alt) this.meta.updateTag(this.createOgTag('image', img.alt, 'alt'))
  }
  addImg(img: SEOImage) {
    if (img.url) this.meta.addTag(this.createOgTag('image', img.url));
  }
  clearTags(){    
    this.meta.removeTag('property="description"');
    this.clearImgTags();
  }
  clearImgTags(){
    this.meta.removeTag('property="og:image"');
  }
  updateType(type = 'website') {
    this.meta.updateTag(this.createOgTag('type', type))
  }

  updateLocale(locale = 'en_US') {
    this.meta.updateTag(this.createOgTag('locale', locale))
  }

  updateUrl(url: string) {
    this.meta.updateTag(this.createOgTag('url', url))
  }

  updateTags(tags: string[]) {
    tags.forEach(tag => this.meta.removeTag('property="og:article:tag"'))
    tags.forEach(tag => this.meta.addTag(this.createOgTag('article', tag, 'tag')))
  }

  createOgTag(property: string, content: string, property2?: string) {
    return {
      property: property2 ? `og:${property}:${property2}` : `og:${property}`,
      content
    }
  }
}