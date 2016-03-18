
/**
 * Create a node tree based on one node and its children.
 *
 * @param array results
 * @param int   id
 * @return object
 */
function makeTree(results, id)
{
    // Pluck one node out of the list with the same id.
    var found = results.find(function(item) {
        return item.node.properties.id == id;
    });


    // Transform the current node a bit to be conform
    // the json-ld standard.
    var node = transformNode(found);

    // Build a sub tree for each child.
    var children = found.children.map(function(id) {
        return makeTree(results, id);
    });

    // Sort by order property
    node.children =  children.sort(function(obj1, obj2) {
        return obj1.order - obj2.order;
    });

    return node;
}

/**
 * Rename some node properties and move them
 * around a little bit to match the original
 * json-ld schema.
 *
 * @param object found
 * @returns object
 */
function transformNode(found)
{
    var node = found.node.properties;

    // Transform the node
    node['@type'] = found.node.labels[0];
    node['@id'] = node.id;
    delete node.id;

    // Transform the value
    if(found.value) {
        node.value = found.value.properties;
        node.value['@type'] = found.value.labels[0];
        node.value['@id'] = node.value.id;
        delete node.value.id;
    }

    return node;
}

exports.makeTree = makeTree;
exports.transformNode = transformNode;