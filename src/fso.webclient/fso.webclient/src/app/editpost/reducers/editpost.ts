import * as editpost from '../actions/editpost';
import { PostPart } from '../../shared/models/postpart';
import { InterestCard } from '../../shared/models/interest/interestcard';
import { CollectionCard } from '../../shared/models/collection/collectioncard';
export interface EditPostState{
    title: string;
    content: string;
    privacyStatus: number;
    description: string;
    isPublished: boolean;
    postParts: Array<PostPart>;
    selectedInterestIds: Array<number>;
    collectionId: number;
    id: number;
    collection:CollectionCard;
}
export interface State {
    isLoading: boolean;
    isPostPartPending:boolean;
    formPending:boolean;
    error: string | null;
    post: EditPostState;    
    interests: Array<InterestCard>;
    collections: Array<CollectionCard>
    selectedInterests: Array<InterestCard>;
    autoCompleteInterestsLoading: boolean;
    isPostLoading:boolean;
};

export const initialState: State = {
    isLoading:false,
    isPostPartPending:false,
    error: null,        
    formPending:false,
    interests: [],
    collections:[],
    selectedInterests:[],
    autoCompleteInterestsLoading: false,
    isPostLoading: false,
    post:{
        title: '',
        content: '',
        privacyStatus: 0,
        description: '',
        isPublished: false,
        collection:{
            name: '',
            id: 0,
            urlKey: '',
            postCount: '',
            thumbImageUrl: '',
            publishDate: '',
            dateUtcModified: '',
            userInfo:{},
            userInfoId:''
        },
        postParts: [],
        selectedInterestIds: [],
        collectionId: 0,
        id: 0
    }
};

export function reducer(state = initialState, action: editpost.EditPostActions ): State {
    switch (action.type) {
        case editpost.EditPostActionTypes.SUBMIT_FORM: {
            return {
                ...state,
                formPending:true
            };
        }
        case editpost.EditPostActionTypes.SUBMIT_FORM_SUCCESS: {
            return {
                ...state,
                formPending:false,
            };
        }
        case editpost.EditPostActionTypes.SUBMIT_FORM_FAIL: {
            return {
                ...state,
                formPending:false,
                error:action.payload.error
            };
        }
        case editpost.EditPostActionTypes.SHOW_ERROR: {
            return {
                ...state,
                error:action.payload,
            };
        }
        case editpost.EditPostActionTypes.SELECT_INTEREST: {
            const interestId = action.payload;
            const interest = state.interests.find((interest)=> interest.id == interestId);
            return {
                ...state,
                isLoading:true,
                selectedInterests: [...state.selectedInterests, interest]
            };
        }
        case editpost.EditPostActionTypes.DESELECT_INTEREST: {
            const interestId = action.payload;
            return {
                ...state,
                isLoading:true,
                selectedInterests: state.selectedInterests.filter((item) => { 
                    return item.id !== interestId
                })
            };
        }
        case editpost.EditPostActionTypes.GET_EDITING_POST: {
            return {
                ...state,
                isPostLoading:true,
                isPostPartPending:true
            };
        }
        case editpost.EditPostActionTypes.GET_EDITING_POST_SUCCESS: {
            return {
                ...state,
                selectedInterests:action.payload.prevInterests,
                isPostLoading:false,
                isPostPartPending:false,
                collections: action.payload.userCollections,
                
                post: {
                    ...state.post,
                    description:action.payload.description,
                    selectedInterestIds:action.payload.prevInterests.map(f=>f.id),
                    title:action.payload.title,
                    content: action.payload.content,
                    collectionId:action.payload.prevCollectionId,
                    isPublished:action.payload.isPublished,
                    postParts: action.payload.postParts,
                    collection:action.payload.collection,
                    
                    id: action.payload.id
                }
            };
        }
        case editpost.EditPostActionTypes.GET_EDITING_POST_FAIL: {
            return {
                ...state,
                isPostLoading:false
            };
        }
        case editpost.EditPostActionTypes.GET_AUTOCOMPLETE_INTEREST: {
            return {
                ...state,
                autoCompleteInterestsLoading:true
            };
        }
        case editpost.EditPostActionTypes.GET_AUTOCOMPLETE_INTEREST_SUCCESS: {
            return {
                ...state,
                autoCompleteInterestsLoading:false,
                interests:action.payload
            };
        }
        case editpost.EditPostActionTypes.GET_AUTOCOMPLETE_INTEREST_FAIL: {
            return {
                ...state,
                autoCompleteInterestsLoading:false
            };
        }
        case editpost.EditPostActionTypes.ADD_POSTPART: {
            return {
                ...state,
                isLoading: true,
                isPostPartPending:true,
            };
        }
        case editpost.EditPostActionTypes.ADD_POSTPART_SUCCESS: {
            const newPostPart : PostPart = {
                id:action.payload.ret.postPartId,
                title: '',
                description: '',
                image: {                    
                    dimension:'',
                    extension:'',
                    lazyUrl:'',
                    smallUrl:'',
                    url:'',
                },
                dateUtcAdd: new Date(),
                dateUtcModified: new Date(),
            }
            const newAr = [newPostPart]
            return {
                ...state,
                isLoading:false,
                post: {
                    ...state.post,
                    postParts: [...state.post.postParts,...newAr]
                }
            };
        }
        case editpost.EditPostActionTypes.ADD_POSTPART_FAIL: {
            return {
                ...state,
                isLoading:false,
                error:'Oops an error!'
            };
        }  
        case editpost.EditPostActionTypes.SET_POSTPART_IMAGE: {
            return state;
        }
        case editpost.EditPostActionTypes.SET_POSTPART_IMAGE_SUCCESS: {
            return {
                ...state,
                isLoading:false,
                isPostPartPending:false,
                post: {
                    ...state.post,
                    postParts: state.post.postParts.map(pp => pp.id === action.payload.postPartId  ?
                    // set seen the one with a matching id
                    { ...pp, image:{ 
                        dimension : '',
                        lazyUrl:'',
                        smallUrl :'',
                        url:action.payload.largeImageUrl,
                        extension:''
                    } } :
                    pp
                ),
                }
            };
        }
        case editpost.EditPostActionTypes.SET_POSTPART_IMAGE_FAIL: {
            return {
                ...state,
                isLoading:false,                
                isPostPartPending:false
            };
        }     
        case editpost.EditPostActionTypes.REMOVE_POSTPART: {
            return {
                ...state,
                isLoading:true
            };
        }
        case editpost.EditPostActionTypes.REMOVE_POSTPART_SUCCESS: {
            return {
                ...state,
                isLoading:false,
                post: {
                    ...state.post,
                    postParts: state.post.postParts.
                            filter((postpart)=> postpart.id != action.payload.postPartId),
                }
            };
        }
        case editpost.EditPostActionTypes.REMOVE_POSTPART_FAIL: {
            return {
                ...state,
                isLoading:false
            };
        }    
        default: {
            return state;
        }
    }
}