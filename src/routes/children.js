
import { getChildren } from '../models/nodes'

module.exports = function (req, res) {
    const id = req.params.id
    return res.send(getChildren(id));
}