import React, {useState, useEffect} from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import LoadingSpinner from '../LoadingSpinner';
import CommonNameTab from '../Courses/CommonNameTab';
import api_links from '../../constants/API';


// Access current semester id via props.semesterID
// It's a hook, so when the user changes the main slider, the
//      will automagically propagate down here.
export default function ExploreSubjects(props) {
    const [allCourses, setAllCourses] = useState([]);
    const [maxPage, setMaxPage] = useState(Number.MAX_VALUE);
    const [page, setPage] = useState(-1);

    const get = async pg => {
        // console.log(`${api_links.api_base}/search?term_id=${props.semesterID}&page=${pg}&per=50`);
        let resp = await fetch(`${api_links.api_base}/search?scratch_duplicates=1&term_id=${props.semesterID}&page=${pg}&per=50`);
        let parsed = await resp.json();

        setAllCourses(allCourses.concat(parsed.data));
        if(parsed.pages !== maxPage) setMaxPage(parsed.maxPage)
    }

    let displayCourse = course => {
        return (
            <TouchableOpacity>
                <CommonNameTab course={course}/>
            </TouchableOpacity>
        );
        // <Text>{`${course.common_name} - ${course.title}`}</Text>
    }

    let nextPage = () => {
        console.log("Getting another page |", page + 1);
        get(page + 1);
        setPage(page + 1);
    }

    // const loader = (<LoadingSpinner/>);
    const loader = (<Text>Loading...</Text>);

    if(page === -1 && props.semesterID !== "0000") nextPage();

    return (
        <View>
            <FlatList style={{
                        width: Dimensions.get('screen').width,
                    }}
                    contentContainerStyle={{
                        alignItems: 'center'
                    }}
                    data={allCourses}
                    renderItem={({item}) => displayCourse(item)}
                    keyExtractor={item => item._id}
                    onEndReachedThreshold={1}
                    onEndReached={nextPage}/>
        </View>
    );
}
